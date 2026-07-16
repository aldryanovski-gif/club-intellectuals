-- =============================================================
-- Club Intellectuals — Supabase schema
-- Run this once in: Supabase Dashboard -> SQL Editor -> New query
-- =============================================================

-- Content table: news, events and projects in one table
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('news', 'event', 'project')),
  slug text not null unique,
  title_en text not null,
  title_sk text not null default '',
  excerpt_en text not null default '',
  excerpt_sk text not null default '',
  body_en text not null default '',
  body_sk text not null default '',
  cover_url text,
  event_date date,
  external_url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.posts enable row level security;

drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts for select
  using (published = true);

drop policy if exists "Admins have full access to posts" on public.posts;
create policy "Admins have full access to posts"
  on public.posts for all
  to authenticated
  using (true)
  with check (true);

-- Contact form messages
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can send a message" on public.contact_messages;
create policy "Anyone can send a message"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can read messages" on public.contact_messages;
create policy "Admins can read messages"
  on public.contact_messages for select
  to authenticated
  using (true);

drop policy if exists "Admins can delete messages" on public.contact_messages;
create policy "Admins can delete messages"
  on public.contact_messages for delete
  to authenticated
  using (true);

-- Public storage bucket for images
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public can view media" on storage.objects;
create policy "Public can view media"
  on storage.objects for select
  using (bucket_id = 'media');

drop policy if exists "Admins can upload media" on storage.objects;
create policy "Admins can upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "Admins can delete media" on storage.objects;
create policy "Admins can delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');

-- Sample content so the site is not empty on first run (edit or delete in the admin panel)
insert into public.posts (type, slug, title_en, title_sk, excerpt_en, excerpt_sk, body_en, body_sk, published, external_url)
values
  ('project', 'eufit', 'EUFIT Project', 'Projekt EUFIT',
   'Health-enhancing physical activity and learning methodologies for adults.',
   'Zdraviu prospešná pohybová aktivita a vzdelávacie metodiky pre dospelých.',
   'EUFIT brings together sport, health-enhancing physical activity (HEPA) and adult learning. Our experts contribute methodologies and adult educational programme development, integrating sport into a cascade of learning processes tailored to adults'' specific learning patterns.',
   'EUFIT spája šport, zdraviu prospešnú pohybovú aktivitu (HEPA) a vzdelávanie dospelých. Naši experti prispievajú metodikami a vývojom vzdelávacích programov pre dospelých, integrujúc šport do procesov učenia prispôsobených dospelým.',
   true, null),
  ('project', 'career-discovery', 'Cover Your Needs — Discover Your Career', 'Pokry svoje potreby — objav svoju kariéru',
   'A European partnership helping people match their needs with a career path.',
   'Európske partnerstvo pomáhajúce ľuďom zosúladiť ich potreby s kariérnou cestou.',
   'A cross-border initiative focused on career guidance and skills development. Learn more on the project website.',
   'Cezhraničná iniciatíva zameraná na kariérne poradenstvo a rozvoj zručností. Viac na stránke projektu.',
   true, 'http://www.careerdiscovery.eu/project/'),
  ('news', 'welcome-new-website', 'Welcome to our new website', 'Vitajte na našej novej stránke',
   'A fresh home for our projects, news and events.',
   'Nový domov pre naše projekty, novinky a podujatia.',
   'We have launched a new website where you will find our latest projects, news and upcoming events. Stay tuned!',
   'Spustili sme novú webovú stránku, kde nájdete naše najnovšie projekty, novinky a nadchádzajúce podujatia. Sledujte nás!',
   true, null)
on conflict (slug) do nothing;
