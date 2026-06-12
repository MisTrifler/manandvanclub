-- Quote attempt archive + simplified auto-return flow.
-- Single active quote locks a request for 6 hours. Declined (still
-- needs help) and expired quotes auto-return to the available pool —
-- no admin review required. Attempts are archived here for safe
-- driver-facing history (no driver identity is ever shown to others).

CREATE TABLE IF NOT EXISTS public.move_request_quote_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL,
  driver_email text NOT NULL,
  quote_options jsonb NOT NULL DEFAULT '[]'::jsonb,
  quote_amount numeric,
  quoted_at timestamptz,
  quote_expires_at timestamptz,
  outcome text NOT NULL,
  outcome_at timestamptz,
  customer_decline_reason text,
  customer_budget_min numeric,
  customer_budget_max numeric,
  customer_still_needs_help boolean,
  customer_feedback_notes text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS quote_attempts_request_id_idx ON public.move_request_quote_attempts (request_id);
CREATE INDEX IF NOT EXISTS quote_attempts_driver_email_idx ON public.move_request_quote_attempts (driver_email);
CREATE INDEX IF NOT EXISTS quote_attempts_outcome_idx ON public.move_request_quote_attempts (outcome);
CREATE INDEX IF NOT EXISTS quote_attempts_outcome_at_idx ON public.move_request_quote_attempts (outcome_at);

GRANT ALL PRIVILEGES ON TABLE public.move_request_quote_attempts TO service_role;

NOTIFY pgrst, 'reload schema';
