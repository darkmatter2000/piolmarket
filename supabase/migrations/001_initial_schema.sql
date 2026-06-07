-- ============================================
-- MoneyPiol — Initial Database Schema
-- Migration: 001_initial_schema.sql
-- ============================================

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "postgis"; -- for geo queries

-- ============================================
-- NEIGHBORHOODS
-- ============================================
create table neighborhoods (
  id          uuid primary key default uuid_generate_v4(),
  created_at  timestamptz not null default now(),
  name        text not null,
  city        text not null check (city in ('douala', 'yaounde', 'kribi')),
  slug        text not null unique,
  lat         double precision not null,
  lng         double precision not null,
  description text
);

-- ============================================
-- USER PROFILES
-- ============================================
create table profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  created_at      timestamptz not null default now(),
  email           text not null,
  full_name       text,
  phone           text,
  avatar_url      text,
  role            text not null default 'user' check (role in ('user', 'agency', 'admin')),
  city            text check (city in ('douala', 'yaounde', 'kribi')),
  is_diaspora     boolean not null default false,
  points_balance  integer not null default 0,
  updated_at      timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================
-- PROPERTIES
-- ============================================
create table properties (
  id                  uuid primary key default uuid_generate_v4(),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),

  title               text not null,
  description         text,
  listing_type        text not null check (listing_type in ('sale', 'rental')),
  property_type       text not null check (property_type in ('apartment', 'house', 'villa', 'land', 'commercial', 'office')),

  -- Price (ALWAYS asked price, never transaction price)
  price               bigint not null,
  price_per_sqm       bigint,
  currency            text not null default 'XAF' check (currency in ('XAF', 'USD', 'EUR')),
  negotiable          boolean not null default false,

  -- Location
  city                text not null check (city in ('douala', 'yaounde', 'kribi')),
  neighborhood_id     uuid references neighborhoods(id),
  address             text,
  lat                 double precision,
  lng                 double precision,

  -- Details
  area_sqm            integer,
  bedrooms            integer,
  bathrooms           integer,
  floor               integer,
  total_floors        integer,
  parking             boolean not null default false,
  furnished           boolean not null default false,
  features            text[] not null default '{}',

  -- Primary photo URL (denormalized for performance)
  primary_photo_url   text,

  -- Source
  source              text not null default 'user' check (source in ('scraper', 'user', 'agency')),
  source_url          text,
  source_name         text,

  -- Verification
  verification_status text not null default 'pending' check (verification_status in ('pending', 'verified', 'rejected', 'flagged')),
  verified_at         timestamptz,

  -- Engagement
  view_count          integer not null default 0,
  contact_count       integer not null default 0,

  -- Owner
  user_id             uuid references profiles(id),
  agency_id           uuid -- FK to agencies table (future)
);

-- Indexes for common queries
create index idx_properties_city on properties(city);
create index idx_properties_listing_type on properties(listing_type);
create index idx_properties_property_type on properties(property_type);
create index idx_properties_neighborhood on properties(neighborhood_id);
create index idx_properties_price on properties(price);
create index idx_properties_created_at on properties(created_at desc);
create index idx_properties_geo on properties(lat, lng) where lat is not null;

-- ============================================
-- PROPERTY PHOTOS
-- ============================================
create table property_photos (
  id                  uuid primary key default uuid_generate_v4(),
  created_at          timestamptz not null default now(),
  property_id         uuid not null references properties(id) on delete cascade,
  storage_path        text not null,
  url                 text not null,
  is_primary          boolean not null default false,

  -- Anti-fraud GPS verification
  -- IMPORTANT: threshold for duplicate detection = 0.0001 degrees (~11 meters)
  gps_lat             double precision,
  gps_lng             double precision,
  gps_accuracy_meters real,
  captured_at         timestamptz,
  is_live_capture     boolean not null default false, -- true = taken in-app

  order_index         integer not null default 0
);

create index idx_photos_property on property_photos(property_id);
create index idx_photos_gps on property_photos(gps_lat, gps_lng) where gps_lat is not null;

-- ============================================
-- PRICE SNAPSHOTS (market intelligence)
-- ============================================
create table price_snapshots (
  id                  uuid primary key default uuid_generate_v4(),
  recorded_at         timestamptz not null default now(),
  city                text not null check (city in ('douala', 'yaounde', 'kribi')),
  neighborhood_id     uuid references neighborhoods(id),
  listing_type        text not null check (listing_type in ('sale', 'rental')),
  property_type       text not null check (property_type in ('apartment', 'house', 'villa', 'land', 'commercial', 'office')),

  median_price        bigint not null,
  median_price_per_sqm bigint,
  sample_count        integer not null,
  currency            text not null default 'XAF'
);

create index idx_snapshots_city_type on price_snapshots(city, listing_type, recorded_at desc);
create index idx_snapshots_neighborhood on price_snapshots(neighborhood_id, recorded_at desc);

-- ============================================
-- POINTS LEDGER
-- ============================================
create table points_ledger (
  id              uuid primary key default uuid_generate_v4(),
  created_at      timestamptz not null default now(),
  user_id         uuid not null references profiles(id) on delete cascade,
  amount          integer not null, -- positive = credit, negative = debit
  type            text not null check (type in ('listing_submit', 'verification_bonus', 'referral', 'redemption', 'penalty')),
  description     text not null,
  reference_id    uuid -- e.g. property_id
);

create index idx_points_user on points_ledger(user_id, created_at desc);

-- ============================================
-- PREDICTIONS (gamified sentiment)
-- ============================================
create table predictions (
  id                  uuid primary key default uuid_generate_v4(),
  created_at          timestamptz not null default now(),
  question            text not null,
  city                text not null check (city in ('douala', 'yaounde', 'kribi')),
  neighborhood_id     uuid references neighborhoods(id),
  listing_type        text not null check (listing_type in ('sale', 'rental')),
  closes_at           timestamptz not null,
  resolved_at         timestamptz,
  resolution          boolean,

  yes_count           integer not null default 0,
  no_count            integer not null default 0,
  yes_points_pool     integer not null default 0,
  no_points_pool      integer not null default 0
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Properties: public read, authenticated create, own update
alter table properties enable row level security;
create policy "properties_public_read" on properties for select using (true);
create policy "properties_auth_insert" on properties for insert with check (auth.uid() = user_id);
create policy "properties_own_update" on properties for update using (auth.uid() = user_id);

-- Profiles: own read/update
alter table profiles enable row level security;
create policy "profiles_own_read" on profiles for select using (auth.uid() = id);
create policy "profiles_own_update" on profiles for update using (auth.uid() = id);

-- Photos: public read, follow property ownership
alter table property_photos enable row level security;
create policy "photos_public_read" on property_photos for select using (true);

-- Price snapshots: public read
alter table price_snapshots enable row level security;
create policy "snapshots_public_read" on price_snapshots for select using (true);

-- Neighborhoods: public read
alter table neighborhoods enable row level security;
create policy "neighborhoods_public_read" on neighborhoods for select using (true);

-- ============================================
-- SEED: Neighborhoods
-- ============================================
insert into neighborhoods (name, city, slug, lat, lng) values
  ('Bonanjo',     'douala',  'bonanjo',     4.0511, 9.7085),
  ('Akwa',        'douala',  'akwa',         4.0522, 9.7145),
  ('Makepe',      'douala',  'makepe',       4.0697, 9.7589),
  ('Bonapriso',   'douala',  'bonapriso',    4.0381, 9.7012),
  ('Logpom',      'douala',  'logpom',       4.0781, 9.7234),
  ('Ndokoti',     'douala',  'ndokoti',      4.0620, 9.7380),
  ('Bastos',      'yaounde', 'bastos',       3.8869, 11.5197),
  ('Omnisport',   'yaounde', 'omnisport',    3.8480, 11.5021),
  ('Nlongkak',    'yaounde', 'nlongkak',     3.8764, 11.5078),
  ('Mvan',        'yaounde', 'mvan',         3.8200, 11.5400),
  ('Biyem-Assi',  'yaounde', 'biyem-assi',   3.8581, 11.4921),
  ('Centre-ville','kribi',   'kribi-centre', 2.9360, 9.9053),
  ('Plage',       'kribi',   'kribi-plage',  2.9280, 9.9140);
