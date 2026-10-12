-- Supabase Migration: Date Submissions Schema & Secure RLS (v2 - Mobile & No Budget)
-- Created for Our Little Date Planner 💌 (For Chotu)

CREATE TABLE IF NOT EXISTS public.date_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    selected_vibe_id TEXT NOT NULL,
    vibe_title TEXT NOT NULL,
    customization JSONB NOT NULL DEFAULT '{}'::jsonb,
    preferred_date TEXT,
    preferred_timing TEXT NOT NULL DEFAULT 'evening',
    special_note TEXT,
    submission_status TEXT NOT NULL DEFAULT 'new' 
        CHECK (submission_status IN ('new', 'reviewed', 'planning', 'completed'))
);

CREATE TABLE IF NOT EXISTS public.authorized_owners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.date_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authorized_owners ENABLE ROW LEVEL SECURITY;

-- Policy A: Anyone can insert their wishlist
CREATE POLICY "Allow public insert for date wishlists"
ON public.date_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
    length(selected_vibe_id) > 0
);

-- Policy B: Deny anonymous reads
CREATE POLICY "Deny anonymous read of date submissions"
ON public.date_submissions
FOR SELECT
TO anon
USING (false);

-- Policy C: Only specifically authorized owner accounts can read submissions
CREATE POLICY "Allow authorized owners to read submissions"
ON public.date_submissions
FOR SELECT
TO authenticated
USING (
    auth.jwt() ->> 'email' IN (SELECT email FROM public.authorized_owners)
);

-- Policy D: Only specifically authorized owner accounts can update status
CREATE POLICY "Allow authorized owners to update submission status"
ON public.date_submissions
FOR UPDATE
TO authenticated
USING (
    auth.jwt() ->> 'email' IN (SELECT email FROM public.authorized_owners)
)
WITH CHECK (
    auth.jwt() ->> 'email' IN (SELECT email FROM public.authorized_owners)
);

-- Policy E: Allow owners to view authorized emails
CREATE POLICY "Allow owners to view authorized emails"
ON public.authorized_owners
FOR SELECT
TO authenticated
USING (
    auth.jwt() ->> 'email' IN (SELECT email FROM public.authorized_owners)
);
