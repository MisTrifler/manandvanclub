-- Migration: Add details JSONB column to move_requests for service-specific form data
-- Run this in Supabase SQL Editor before deploying code that inserts details

ALTER TABLE public.move_requests
ADD COLUMN IF NOT EXISTS details jsonb;

COMMENT ON COLUMN public.move_requests.details IS
'Service-specific move details submitted through the quote form';

GRANT ALL PRIVILEGES ON TABLE public.move_requests TO service_role;

NOTIFY pgrst, 'reload schema';
