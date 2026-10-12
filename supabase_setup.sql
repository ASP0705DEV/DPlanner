-- ==============================================================================
-- FOR CHOTU 💕 (SONU & CHOTU DATE PLANNER & LOVE JOURNAL)
-- SUPABASE COMPLETE SETUP MIGRATION SCRIPT
-- ==============================================================================
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/yqxfglwqsetvpemeswrf/sql/new
-- ==============================================================================

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. TABLE: date_submissions (Chotu's Date Wishlists & Plans)
-- ------------------------------------------------------------------------------
create table if not exists public.date_submissions (
    id uuid primary key default gen_random_uuid(),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    selected_vibe_id text not null,
    vibe_title text not null,
    customization jsonb not null default '{}'::jsonb,
    preferred_date text,
    preferred_timing text not null,
    special_note text,
    submission_status text not null default 'new'
);

-- Enable Row Level Security (RLS)
alter table public.date_submissions enable row level security;

-- Policies for date_submissions (allow both anon and authenticated users to submit & view)
create policy "Allow public insert on date_submissions"
    on public.date_submissions for insert
    with check (true);

create policy "Allow public read on date_submissions"
    on public.date_submissions for select
    using (true);

create policy "Allow public update on date_submissions"
    on public.date_submissions for update
    using (true)
    with check (true);

-- ------------------------------------------------------------------------------
-- 2. TABLE: chotu_preferences (The Queen's Favorites Handbook)
-- ------------------------------------------------------------------------------
create table if not exists public.chotu_preferences (
    id text primary key,
    data jsonb not null default '{}'::jsonb,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.chotu_preferences enable row level security;

-- Policies for chotu_preferences
create policy "Allow public read on chotu_preferences"
    on public.chotu_preferences for select
    using (true);

create policy "Allow public upsert on chotu_preferences"
    on public.chotu_preferences for all
    using (true)
    with check (true);

-- ------------------------------------------------------------------------------
-- 3. TABLE: love_memories (Shared Date Photo Journal & Magazine)
-- ------------------------------------------------------------------------------
create table if not exists public.love_memories (
    id text primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    date text not null,
    location text not null,
    category text not null default 'festive',
    category_label text,
    photo_url text not null,
    caption text,
    story text,
    sonu_note text,
    is_user_added boolean default true
);

-- Enable RLS
alter table public.love_memories enable row level security;

-- Policies for love_memories
create policy "Allow public read on love_memories"
    on public.love_memories for select
    using (true);

create policy "Allow public insert on love_memories"
    on public.love_memories for insert
    with check (true);

create policy "Allow public delete on love_memories"
    on public.love_memories for delete
    using (true);

-- ------------------------------------------------------------------------------
-- 4. STORAGE BUCKET: memories (For Photo Uploads & CDN Hosting)
-- ------------------------------------------------------------------------------
-- Insert bucket into storage.buckets if not already present
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'memories',
    'memories',
    true,
    52428800, -- 50MB per photo limit
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic']
)
on conflict (id) do update set
    public = true,
    file_size_limit = 52428800,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic'];

-- Storage Policies for 'memories' bucket
create policy "Allow public select on memories bucket"
    on storage.objects for select
    using (bucket_id = 'memories');

create policy "Allow public upload to memories bucket"
    on storage.objects for insert
    with check (bucket_id = 'memories');

create policy "Allow public update in memories bucket"
    on storage.objects for update
    using (bucket_id = 'memories');

create policy "Allow public delete in memories bucket"
    on storage.objects for delete
    using (bucket_id = 'memories');

-- ==============================================================================
-- DONE! Your Supabase database & storage are now fully configured for For Chotu 💕
-- ==============================================================================
