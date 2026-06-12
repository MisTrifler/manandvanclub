-- ─────────────────────────────────────────────────────────────────────
-- LAUNCH READINESS — consolidated migration.
-- Safe to run repeatedly (ADD COLUMN IF NOT EXISTS throughout).
-- This is the single script to run in the Supabase SQL Editor: it
-- covers every column required by the current launch flow, including
-- anything from earlier migration files that may not have been applied.
-- ─────────────────────────────────────────────────────────────────────

-- A. move_requests: booking deposit model + customer quote tokens
ALTER TABLE public.move_requests
  ADD COLUMN IF NOT EXISTS details jsonb,
  ADD COLUMN IF NOT EXISTS quote_amount numeric,
  ADD COLUMN IF NOT EXISTS quote_message text,
  ADD COLUMN IF NOT EXISTS quoted_by text,
  ADD COLUMN IF NOT EXISTS quoted_at timestamptz,
  ADD COLUMN IF NOT EXISTS quote_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS booking_fee numeric,
  ADD COLUMN IF NOT EXISTS booking_fee_paid boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS booking_fee_paid_at timestamptz,
  ADD COLUMN IF NOT EXISTS booking_fee_stripe_session_id text,
  ADD COLUMN IF NOT EXISTS customer_quote_token text,
  ADD COLUMN IF NOT EXISTS customer_quote_token_created_at timestamptz,
  ADD COLUMN IF NOT EXISTS customer_accepted_quote_at timestamptz,
  ADD COLUMN IF NOT EXISTS customer_declined_quote_at timestamptz,
  ADD COLUMN IF NOT EXISTS customer_details_released_at timestamptz,
  ADD COLUMN IF NOT EXISTS declined_reason text,
  ADD COLUMN IF NOT EXISTS admin_notes text;

-- B. move_requests: structured quote options
ALTER TABLE public.move_requests
  ADD COLUMN IF NOT EXISTS quote_options jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS selected_quote_option_id text,
  ADD COLUMN IF NOT EXISTS selected_quote_option jsonb,
  ADD COLUMN IF NOT EXISTS selected_quote_option_at timestamptz;

-- C. driver_applications: approved service types (marketplace filtering)
ALTER TABLE public.driver_applications
  ADD COLUMN IF NOT EXISTS service_house boolean,
  ADD COLUMN IF NOT EXISTS service_flat boolean,
  ADD COLUMN IF NOT EXISTS service_student boolean,
  ADD COLUMN IF NOT EXISTS service_furniture boolean,
  ADD COLUMN IF NOT EXISTS service_office boolean,
  ADD COLUMN IF NOT EXISTS service_single boolean,
  ADD COLUMN IF NOT EXISTS service_long_distance boolean;

-- D. driver_applications: insurance verification (admin-confirmed)
ALTER TABLE public.driver_applications
  ADD COLUMN IF NOT EXISTS insurance_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS insurance_verified_at timestamptz,
  ADD COLUMN IF NOT EXISTS insurance_notes text;

-- Indexes (idempotent)
CREATE UNIQUE INDEX IF NOT EXISTS move_requests_customer_quote_token_idx
  ON public.move_requests (customer_quote_token)
  WHERE customer_quote_token IS NOT NULL;

CREATE INDEX IF NOT EXISTS move_requests_status_idx
  ON public.move_requests (status);

CREATE INDEX IF NOT EXISTS move_requests_quoted_by_idx
  ON public.move_requests (quoted_by);

GRANT ALL PRIVILEGES ON TABLE public.move_requests TO service_role;
GRANT ALL PRIVILEGES ON TABLE public.driver_applications TO service_role;

NOTIFY pgrst, 'reload schema';
