-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. Admins Table
create table admins (
  email text primary key
);

-- 2. Site Settings Table
create table site_settings (
  id uuid primary key default gen_random_uuid(),
  business_name text,
  phone text,
  whatsapp text,
  email text,
  address text,
  socials jsonb,
  seo_defaults jsonb,
  gsc_verification_code text,
  ga_measurement_id text,
  updated_at timestamptz default now()
);

-- 3. Products Table
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  short_desc text,
  long_desc text,
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. Product Specs Table
create table product_specs (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  grade_type text,
  moisture text,
  purity text,
  origin text,
  packaging_options text[],
  moq text,
  shelf_life text,
  lead_time text,
  documentation text[],
  applications text[],
  updated_at timestamptz default now()
);

-- 5. Product Images Table
create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 6. Spec Sheets Table
create table spec_sheets (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  title text,
  file_url text not null,
  created_at timestamptz default now()
);

-- 7. Page Sections Table (CMS)
create table page_sections (
  id uuid primary key default gen_random_uuid(),
  page_key text, -- e.g. 'about', 'industries', 'export_readiness', 'home'
  title text,
  content jsonb, -- structured blocks
  updated_at timestamptz default now()
);

-- 8. Gallery Items Table
create table gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  url text not null,
  caption text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 9. Blog Posts Table
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image_url text,
  tags text[],
  is_published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 10. RFQs Table
create table rfqs (
  id uuid primary key default gen_random_uuid(),
  rfq_no text unique,
  full_name text,
  company_name text,
  email text,
  phone text,
  whatsapp text,
  role text,
  destination_country text,
  incoterm text,
  timeline text,
  requested_products jsonb, -- product selections + quantities + packaging prefs
  compliance_needs jsonb,
  notes text,
  status text default 'NEW',
  internal_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Helper function to check if user is admin
create or replace function is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from admins
    where email = auth.jwt() ->> 'email'
  );
end;
$$ language plpgsql security definer;

-- Enable RLS on all tables
alter table admins enable row level security;
alter table site_settings enable row level security;
alter table products enable row level security;
alter table product_specs enable row level security;
alter table product_images enable row level security;
alter table spec_sheets enable row level security;
alter table page_sections enable row level security;
alter table gallery_items enable row level security;
alter table blog_posts enable row level security;
alter table rfqs enable row level security;

-- Policies

-- Admins table: only readable by admins themselves (or superuser) - effectively nobody needs to read this from client except maybe to check status?
-- Let's say admins can read admins table to manage other admins potentially.
create policy "Admins can do everything on admins"
  on admins for all
  using (is_admin());

-- Site Settings
create policy "Public can read site settings"
  on site_settings for select
  to anon, authenticated
  using (true);

create policy "Admins can update site settings"
  on site_settings for all
  using (is_admin());

-- Products & Specs & Images & Spec Sheets
create policy "Public can read active products"
  on products for select
  to anon, authenticated
  using (is_active = true or is_admin());

create policy "Admins can manage products"
  on products for all
  using (is_admin());

create policy "Public can read product specs"
  on product_specs for select
  to anon, authenticated
  using (true); -- Implicitly filtered by product access usually, but okay to be open

create policy "Admins can manage product specs"
  on product_specs for all
  using (is_admin());

create policy "Public can read product images"
  on product_images for select
  to anon, authenticated
  using (true);

create policy "Admins can manage product images"
  on product_images for all
  using (is_admin());

create policy "Public can read spec sheets"
  on spec_sheets for select
  to anon, authenticated
  using (true);

create policy "Admins can manage spec sheets"
  on spec_sheets for all
  using (is_admin());

-- Page Sections
create policy "Public can read page sections"
  on page_sections for select
  to anon, authenticated
  using (true);

create policy "Admins can manage page sections"
  on page_sections for all
  using (is_admin());

-- Gallery
create policy "Public can read active gallery"
  on gallery_items for select
  to anon, authenticated
  using (is_active = true or is_admin());

create policy "Admins can manage gallery"
  on gallery_items for all
  using (is_admin());

-- Blog
create policy "Public can read published posts"
  on blog_posts for select
  to anon, authenticated
  using (is_published = true or is_admin());

create policy "Admins can manage blog posts"
  on blog_posts for all
  using (is_admin());

-- RFQs
create policy "Public can insert RFQs"
  on rfqs for insert
  to anon, authenticated
  with check (true);

create policy "Admins can read/manage RFQs"
  on rfqs for all
  using (is_admin());

-- Realtime Setup
-- Enable realtime for tables that public needs to see updates for
alter publication supabase_realtime add table products;
alter publication supabase_realtime add table product_images;
alter publication supabase_realtime add table spec_sheets;
alter publication supabase_realtime add table site_settings;
alter publication supabase_realtime add table page_sections;
alter publication supabase_realtime add table gallery_items;
alter publication supabase_realtime add table blog_posts;

-- Storage Buckets (if using supabase/storage-api, usually done via API or UI, but can be done via SQL extension if enabled)
-- For now, we assume buckets are created via dashboard or we can try to insert into storage.buckets if using local/self-hosted or if permissions allow.
-- Since this is often restricted, I'll document it in the README, but I'll add the SQL here just in case it works (often works in seed/migrations for local dev).

insert into storage.buckets (id, name, public)
values 
  ('product-images', 'product-images', true),
  ('spec-sheets', 'spec-sheets', true),
  ('gallery', 'gallery', true),
  ('blog-covers', 'blog-covers', true)
on conflict (id) do nothing;

-- Storage Policies
-- Helper to simplify
create policy "Public Access Product Images"
  on storage.objects for select
  using ( bucket_id = 'product-images' );

create policy "Public Access Spec Sheets"
  on storage.objects for select
  using ( bucket_id = 'spec-sheets' );

create policy "Public Access Gallery"
  on storage.objects for select
  using ( bucket_id = 'gallery' );

create policy "Public Access Blog Covers"
  on storage.objects for select
  using ( bucket_id = 'blog-covers' );

create policy "Admin Upload Product Images"
  on storage.objects for insert
  with check ( bucket_id = 'product-images' and is_admin() );

create policy "Admin Update Product Images"
  on storage.objects for update
  using ( bucket_id = 'product-images' and is_admin() );

create policy "Admin Delete Product Images"
  on storage.objects for delete
  using ( bucket_id = 'product-images' and is_admin() );

-- (Repeat for other buckets or make a generic admin policy if possible, but explicit is safer)
create policy "Admin Manage Spec Sheets"
  on storage.objects for all
  using ( bucket_id = 'spec-sheets' and is_admin() );

create policy "Admin Manage Gallery"
  on storage.objects for all
  using ( bucket_id = 'gallery' and is_admin() );

create policy "Admin Manage Blog Covers"
  on storage.objects for all
  using ( bucket_id = 'blog-covers' and is_admin() );






