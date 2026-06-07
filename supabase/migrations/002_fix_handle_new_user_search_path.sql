-- Fix: handle_new_user() fails with "relation profiles does not exist" because
-- the security definer function is executed as supabase_auth_admin, whose
-- search_path does not include `public`. Qualify the table and pin search_path.
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer set search_path = public;
