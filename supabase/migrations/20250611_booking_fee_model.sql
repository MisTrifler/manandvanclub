-- Migration: Add customer-paid booking fee model columns
-- Run in Supabase SQL Editor before deploying new code

ALTER TABLE public.move_requests
ADD COLUMN IF NOT EXISTS customer_quote_token text,
ADD COLUMN IF NOT EXISTS quote_amount numeric,
ADD COLUMN IF NOT EXISTS quote_message text,
ADD COLUMN IF NOT EXISTS quoted_by text,
ADD COLUMN IF NOT EXISTS quoted_at timestamptz,
ADD COLUMN IF NOT EXISTS booking_fee numeric,
ADD COLUMN IF NOT EXISTS booking_fee_paid boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS booking_fee_paid_at timestamptz,
ADD COLUMN IF NOT EXISTS booking_fee_stripe_session_id text,
ADD COLUMN IF NOT EXISTS customer_accepted_quote_at timestamptz,
ADD COLUMN IF NOT EXISTS customer_declined_quote_at timestamptz,
ADD COLUMN IF NOT EXISTS customer_details_released_at timestamptz,
ADD COLUMN IF NOT EXISTS details jsonb;

COMMENT ON COLUMN public.move_requests.customer_quote_token IS 'Secure random token for customer quote review page URL';
COMMENT ON COLUMN public.move_requests.quote_amount IS 'Mover submitted quote amount in GBP';
COMMENT ON COLUMN public.move_requests.quote_message IS 'Mover message to customer';
COMMENT ON COLUMN public.move_requests.quoted_by IS 'Driver email who submitted the quote';
COMMENT ON COLUMN public.move_requests.booking_fee IS 'Calculated booking fee based on quote amount';
COMMENT ON COLUMN public.move_requests.booking_fee_paid IS 'Whether customer has paid the booking fee';
COMMENT ON COLUMN public.move_requests.details IS 'Service-specific move details submitted through the quote form';

GRANT ALL PRIVILEGES ON TABLE public.move_requests TO service_role;

NOTIFY pgrst, 'reload schema';
