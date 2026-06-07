// ============================================
// MoneyPiol — Domain Types
// ============================================

export type PropertyType = "apartment" | "house" | "villa" | "land" | "commercial" | "office";
export type ListingType = "sale" | "rental";
export type City = "douala" | "yaounde" | "kribi";
export type VerificationStatus = "pending" | "verified" | "rejected" | "flagged";

// ---- Neighborhood ----
export interface Neighborhood {
  id: string;
  name: string;
  city: City;
  slug: string;
  lat: number;
  lng: number;
  // polygon?: GeoJSON.Polygon; // TODO: contour géographique du quartier (anti-fraude + cartes), nécessite @types/geojson
  description?: string;
}

// ---- Property Listing ----
export interface Property {
  id: string;
  created_at: string;
  updated_at: string;

  title: string;
  description?: string;
  listing_type: ListingType;
  property_type: PropertyType;

  // Price (asked price — NOT transaction price)
  price: number;
  price_per_sqm?: number;
  currency: "XAF" | "USD" | "EUR";
  negotiable: boolean;

  // Location
  city: City;
  neighborhood_id?: string;
  neighborhood?: Neighborhood;
  address?: string;
  lat?: number;
  lng?: number;

  // Details
  area_sqm?: number;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  total_floors?: number;
  parking: boolean;
  furnished: boolean;
  features: string[];

  // Media
  photos: PropertyPhoto[];
  primary_photo_url?: string;

  // Source
  source: "scraper" | "user" | "agency";
  source_url?: string;
  source_name?: string;

  // Verification
  verification_status: VerificationStatus;
  verified_at?: string;

  // Engagement
  view_count: number;
  contact_count: number;

  // Owner
  user_id?: string;
  agency_id?: string;
}

// ---- Property Photo ----
export interface PropertyPhoto {
  id: string;
  property_id: string;
  url: string;
  storage_path: string;
  is_primary: boolean;

  // Anti-fraud GPS data
  gps_lat?: number;
  gps_lng?: number;
  gps_accuracy_meters?: number;
  captured_at?: string; // ISO timestamp at capture
  is_live_capture: boolean; // true = taken in-app, false = uploaded

  order_index: number;
}

// ---- Price Snapshot (for market indices) ----
export interface PriceSnapshot {
  id: string;
  recorded_at: string;
  city: City;
  neighborhood_id?: string;
  listing_type: ListingType;
  property_type: PropertyType;

  // Aggregate stats for this snapshot
  median_price: number;
  median_price_per_sqm?: number;
  sample_count: number;
  currency: "XAF";
}

// ---- Market Stats (computed) ----
export interface MarketStats {
  city: City;
  neighborhood?: string;
  listing_type: ListingType;
  period: "1m" | "3m" | "6m" | "1y";

  current_median: number;
  current_median_sqm?: number;
  change_pct: number; // % change vs previous period
  sample_count: number;
  trend: "up" | "down" | "stable";
}

// ---- User Profile ----
export interface UserProfile {
  id: string; // matches auth.users.id
  email: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  role: "user" | "agency" | "admin";
  city?: City;
  is_diaspora: boolean;
  points_balance: number;
  created_at: string;
}

// ---- Points Ledger ----
export interface PointsLedgerEntry {
  id: string;
  user_id: string;
  amount: number; // positive = credit, negative = debit
  type: "listing_submit" | "verification_bonus" | "referral" | "redemption" | "penalty";
  description: string;
  reference_id?: string; // e.g. property_id
  created_at: string;
}

// ---- Prediction (gamified sentiment) ----
export interface Prediction {
  id: string;
  question: string;
  city: City;
  neighborhood_id?: string;
  listing_type: ListingType;
  closes_at: string;
  resolved_at?: string;
  resolution?: boolean;

  yes_count: number;
  no_count: number;
  yes_points_pool: number;
  no_points_pool: number;
}

// ---- API Response shapes ----
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ListingsFilters {
  city?: City;
  neighborhood_id?: string;
  listing_type?: ListingType;
  property_type?: PropertyType;
  price_min?: number;
  price_max?: number;
  area_min?: number;
  bedrooms_min?: number;
  furnished?: boolean;
  sort_by?: "price_asc" | "price_desc" | "newest" | "relevance";
  page?: number;
  page_size?: number;
}
