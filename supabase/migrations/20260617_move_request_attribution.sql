-- ─────────────────────────────────────────────────────────────────────
-- Move request attribution fields.
-- Safe to run repeatedly. These columns make it easier to prove SEO and
-- campaign value to movers without digging through JSON details.
-- ─────────────────────────────────────────────────────────────────────

ALTER TABLE public.move_requests
  ADD COLUMN IF NOT EXISTS landing_page text,
  ADD COLUMN IF NOT EXISTS referrer text,
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS utm_term text,
  ADD COLUMN IF NOT EXISTS utm_content text,
  ADD COLUMN IF NOT EXISTS gclid text,
  ADD COLUMN IF NOT EXISTS gbraid text,
  ADD COLUMN IF NOT EXISTS wbraid text,
  ADD COLUMN IF NOT EXISTS first_touch_at timestamptz,
  ADD COLUMN IF NOT EXISTS device_type text,
  ADD COLUMN IF NOT EXISTS service_intent text,
  ADD COLUMN IF NOT EXISTS collection_outward_postcode text,
  ADD COLUMN IF NOT EXISTS delivery_outward_postcode text,
  ADD COLUMN IF NOT EXISTS guide_price_displayed text;

CREATE INDEX IF NOT EXISTS move_requests_landing_page_idx
  ON public.move_requests (landing_page);

CREATE INDEX IF NOT EXISTS move_requests_utm_source_idx
  ON public.move_requests (utm_source);

CREATE INDEX IF NOT EXISTS move_requests_service_intent_idx
  ON public.move_requests (service_intent);

CREATE INDEX IF NOT EXISTS move_requests_collection_outward_postcode_idx
  ON public.move_requests (collection_outward_postcode);

CREATE INDEX IF NOT EXISTS move_requests_delivery_outward_postcode_idx
  ON public.move_requests (delivery_outward_postcode);

GRANT ALL PRIVILEGES ON TABLE public.move_requests TO service_role;

NOTIFY pgrst, 'reload schema';
