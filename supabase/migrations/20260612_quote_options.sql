-- Structured quote options.
-- Drivers submit 1-3 structured options (service level + van size +
-- total price) instead of a single amount with a free-text message.
-- The customer selects one option; the booking deposit is calculated
-- from the selected option's total price.
--
-- Existing columns (quote_amount, booking_fee, quote_message) are kept
-- for legacy records. Going forward:
--   quote_options          = all options submitted by the driver
--   selected_quote_option  = the option the customer chose
--   quote_amount           = selected option price (set at acceptance)
--   booking_fee            = deposit calculated from the selected option
--   quote_message          = no longer used for new quotes

ALTER TABLE public.move_requests
  ADD COLUMN IF NOT EXISTS quote_options jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS selected_quote_option_id text,
  ADD COLUMN IF NOT EXISTS selected_quote_option jsonb,
  ADD COLUMN IF NOT EXISTS selected_quote_option_at timestamptz,
  ADD COLUMN IF NOT EXISTS customer_accepted_quote_at timestamptz;

NOTIFY pgrst, 'reload schema';
