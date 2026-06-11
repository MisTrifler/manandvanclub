-- Complete customer-paid booking fee marketplace flow columns.
-- Run this in Supabase SQL Editor before deploying/testing the booking fee flow.

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

CREATE UNIQUE INDEX IF NOT EXISTS move_requests_customer_quote_token_idx
ON public.move_requests (customer_quote_token)
WHERE customer_quote_token IS NOT NULL;

CREATE INDEX IF NOT EXISTS move_requests_status_idx
ON public.move_requests (status);

CREATE INDEX IF NOT EXISTS move_requests_quoted_by_idx
ON public.move_requests (quoted_by);

COMMENT ON COLUMN public.move_requests.details IS
'Service-specific move details submitted through the quote form';

COMMENT ON COLUMN public.move_requests.customer_quote_token IS
'Secure token used by customer to review and accept a mover quote';

GRANT ALL PRIVILEGES ON TABLE public.move_requests TO service_role;

NOTIFY pgrst, 'reload schema';
