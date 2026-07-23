
-- Extensions
create extension if not exists "uuid-ossp";

-- Enums
create type order_status as enum ('pending','preparing','out_for_delivery','delivered','cancelled');
create type delivery_method as enum ('home_delivery','pickup');
create type payment_method as enum ('card','bank_transfer','cash_on_delivery','paystack','flutterwave','stripe','apple_pay','google_pay');
create type user_role as enum ('customer','admin','staff');
create type lead_type as enum ('wholesale','corporate','catering');

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  role user_role not null default 'customer',
  loyalty_points integer not null default 0,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

-- Security-definer role check to prevent recursive RLS on profiles
create or replace function public.has_staff_role(_uid uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.profiles where id = _uid and role in ('admin','staff'))
$$;

create policy "Users view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Staff view all profiles" on public.profiles for select using (public.has_staff_role(auth.uid()));

-- Categories
create table public.categories (
  id serial primary key,
  name text not null unique,
  slug text not null unique,
  sort_order integer not null default 0
);
grant select on public.categories to anon, authenticated;
grant all on public.categories to service_role;
alter table public.categories enable row level security;
create policy "Categories are public" on public.categories for select using (true);

-- Products
create table public.products (
  id uuid primary key default uuid_generate_v4(),
  category_id integer references public.categories(id),
  name text not null,
  slug text not null unique,
  description text,
  base_price numeric(10,2) not null,
  image_url text,
  ingredients text,
  calories integer,
  protein_g numeric(5,1),
  sugar_g numeric(5,1),
  fat_g numeric(5,1),
  rating numeric(2,1) default 0,
  review_count integer default 0,
  is_active boolean not null default true,
  is_seasonal boolean not null default false,
  inventory_count integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.products to anon, authenticated;
grant all on public.products to service_role;
alter table public.products enable row level security;
create policy "Products are public" on public.products for select using (is_active = true);
create policy "Staff manage products" on public.products for all using (public.has_staff_role(auth.uid()));

create table public.product_images (
  id serial primary key,
  product_id uuid references public.products(id) on delete cascade,
  image_url text not null,
  sort_order integer not null default 0
);
grant select on public.product_images to anon, authenticated;
grant all on public.product_images to service_role;
alter table public.product_images enable row level security;
create policy "Product images are public" on public.product_images for select using (true);

-- Options
create table public.option_groups (
  id serial primary key,
  key text not null unique,
  label text not null,
  multi_select boolean not null default false
);
grant select on public.option_groups to anon, authenticated;
grant all on public.option_groups to service_role;
alter table public.option_groups enable row level security;
create policy "Option groups public" on public.option_groups for select using (true);

create table public.option_values (
  id serial primary key,
  group_id integer references public.option_groups(id) on delete cascade,
  label text not null,
  price_delta numeric(10,2) not null default 0,
  price_multiplier numeric(5,2) not null default 1
);
grant select on public.option_values to anon, authenticated;
grant all on public.option_values to service_role;
alter table public.option_values enable row level security;
create policy "Option values public" on public.option_values for select using (true);

-- Orders
create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text not null unique,
  user_id uuid references public.profiles(id),
  status order_status not null default 'pending',
  delivery_method delivery_method not null default 'home_delivery',
  payment_method payment_method not null,
  payment_reference text,
  subtotal numeric(10,2) not null,
  discount numeric(10,2) not null default 0,
  delivery_fee numeric(10,2) not null default 0,
  tax numeric(10,2) not null default 0,
  total numeric(10,2) not null,
  coupon_code text,
  full_name text not null,
  phone text not null,
  email text,
  delivery_address text,
  estimated_delivery_minutes integer default 30,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.orders to authenticated;
grant all on public.orders to service_role;
alter table public.orders enable row level security;
create policy "Users view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users create own orders" on public.orders for insert with check (auth.uid() = user_id);
create policy "Staff manage all orders" on public.orders for all using (public.has_staff_role(auth.uid()));

create table public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity integer not null default 1,
  unit_price numeric(10,2) not null,
  size text, base text, granola text,
  fruits text[],
  toppings text[],
  special_instructions text
);
grant select, insert, update, delete on public.order_items to authenticated;
grant all on public.order_items to service_role;
alter table public.order_items enable row level security;
create policy "Users view own order items" on public.order_items for select using (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
);
create policy "Users insert own order items" on public.order_items for insert with check (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
);
create policy "Staff manage all order items" on public.order_items for all using (public.has_staff_role(auth.uid()));

-- Addresses
create table public.addresses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  label text,
  full_address text not null,
  city text,
  is_default boolean default false
);
grant select, insert, update, delete on public.addresses to authenticated;
grant all on public.addresses to service_role;
alter table public.addresses enable row level security;
create policy "Users manage own addresses" on public.addresses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Favorites
create table public.favorites (
  user_id uuid references public.profiles(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);
grant select, insert, update, delete on public.favorites to authenticated;
grant all on public.favorites to service_role;
alter table public.favorites enable row level security;
create policy "Users manage own favorites" on public.favorites for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Coupons
create table public.coupons (
  code text primary key,
  percent_off numeric(5,2) not null,
  active boolean not null default true,
  expires_at timestamptz
);
grant select on public.coupons to anon, authenticated;
grant all on public.coupons to service_role;
alter table public.coupons enable row level security;
create policy "Active coupons public" on public.coupons for select using (active = true);
create policy "Staff manage coupons" on public.coupons for all using (public.has_staff_role(auth.uid()));

-- Reviews
create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade,
  user_id uuid references public.profiles(id),
  order_id uuid references public.orders(id),
  rating integer not null check (rating between 1 and 5),
  body text,
  created_at timestamptz not null default now()
);
grant select on public.reviews to anon, authenticated;
grant insert, update, delete on public.reviews to authenticated;
grant all on public.reviews to service_role;
alter table public.reviews enable row level security;
create policy "Anyone reads reviews" on public.reviews for select using (true);
create policy "Users write own reviews" on public.reviews for insert with check (auth.uid() = user_id);
create policy "Users edit own reviews" on public.reviews for update using (auth.uid() = user_id);

-- Stores
create table public.stores (
  id serial primary key,
  name text not null,
  city text not null,
  area text,
  latitude numeric(9,6),
  longitude numeric(9,6)
);
grant select on public.stores to anon, authenticated;
grant all on public.stores to service_role;
alter table public.stores enable row level security;
create policy "Stores public" on public.stores for select using (true);

-- Leads
create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  type lead_type not null,
  company_or_name text not null,
  email text not null,
  phone text,
  details jsonb,
  created_at timestamptz not null default now()
);
grant insert on public.leads to anon, authenticated;
grant all on public.leads to service_role;
alter table public.leads enable row level security;
create policy "Anyone can submit lead" on public.leads for insert with check (true);
create policy "Staff read leads" on public.leads for select using (public.has_staff_role(auth.uid()));

-- Blog
create table public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  tag text,
  cover_image_url text,
  body_markdown text,
  published_at timestamptz,
  created_at timestamptz not null default now()
);
grant select on public.blog_posts to anon, authenticated;
grant all on public.blog_posts to service_role;
alter table public.blog_posts enable row level security;
create policy "Published posts public" on public.blog_posts for select using (published_at is not null);
create policy "Staff manage posts" on public.blog_posts for all using (public.has_staff_role(auth.uid()));

-- Newsletter
create table public.newsletter_subscribers (
  email text primary key,
  subscribed_at timestamptz not null default now()
);
grant insert on public.newsletter_subscribers to anon, authenticated;
grant select, delete on public.newsletter_subscribers to service_role;
alter table public.newsletter_subscribers enable row level security;
create policy "Anyone can subscribe" on public.newsletter_subscribers for insert with check (true);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)), new.raw_user_meta_data->>'phone')
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Seed data
insert into public.categories (name, slug, sort_order) values
  ('Signature', 'signature', 1),
  ('Greek Yogurt', 'greek-yogurt', 2),
  ('Fruit', 'fruit', 3),
  ('Chocolate Lovers', 'chocolate-lovers', 4),
  ('Kids Specials', 'kids-specials', 5),
  ('Seasonal', 'seasonal', 6);

insert into public.option_groups (key, label, multi_select) values
  ('size', 'Size', false),
  ('base', 'Base', false),
  ('granola', 'Granola', false),
  ('fruit', 'Fruit', true),
  ('topping', 'Extra Toppings', true);

insert into public.option_values (group_id, label, price_delta, price_multiplier) values
  ((select id from public.option_groups where key='size'), 'Small', 0, 0.85),
  ((select id from public.option_groups where key='size'), 'Medium', 0, 1.00),
  ((select id from public.option_groups where key='size'), 'Large', 0, 1.25),
  ((select id from public.option_groups where key='base'), 'Greek Yogurt', 0, 1),
  ((select id from public.option_groups where key='base'), 'Vanilla Yogurt', 0, 1),
  ((select id from public.option_groups where key='base'), 'Coconut Yogurt', 0, 1),
  ((select id from public.option_groups where key='granola'), 'Classic', 0, 1),
  ((select id from public.option_groups where key='granola'), 'Honey', 0, 1),
  ((select id from public.option_groups where key='granola'), 'Chocolate', 0, 1),
  ((select id from public.option_groups where key='topping'), 'Almonds', 0.5, 1),
  ((select id from public.option_groups where key='topping'), 'Cashews', 0.5, 1),
  ((select id from public.option_groups where key='topping'), 'Chia Seeds', 0.5, 1),
  ((select id from public.option_groups where key='topping'), 'Coconut Flakes', 0.5, 1),
  ((select id from public.option_groups where key='topping'), 'Chocolate Chips', 0.5, 1),
  ((select id from public.option_groups where key='topping'), 'Honey Drizzle', 0.5, 1);

insert into public.stores (name, city, area) values
  ('Blenco Supermarket', 'Lagos', 'Sangotedo'),
  ('SPAR — Adeniran Ogunsanya', 'Lagos', 'Surulere'),
  ('Jendol Supermarket', 'Lagos', 'Egbeda'),
  ('UBA Supermarket', 'Lagos', 'Ikeja'),
  ('TQV Supermarket', 'Lagos', 'Lekki'),
  ('Super Saver', 'Lagos', 'Yaba'),
  ('Compra Mart', 'Lagos', 'Ajah'),
  ('Alvira Mart', 'Lagos', 'Ikoyi'),
  ('Berny Supermarket', 'Lagos', 'Gbagada'),
  ('Renee Supermarket', 'Lagos', 'Victoria Island');

insert into public.coupons (code, percent_off, active) values
  ('HAVEN10', 10, true),
  ('WELCOME15', 15, true);
