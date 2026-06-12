-- Customer feedback + budget review after quote declined/expired.
-- Flow: declined/expired -> quote_feedback_pending -> customer submits
-- feedback -> quote_feedback_received -> admin decides:
-- release_to_pool (status=available, quote fields cleared) |
-- close_request (status=closed) | contact_customer.
-- Requests in feedback states are NOT visible in the driver pool.

ALTER TABLE public.move_requests
  ADD COLUMN IF NOT EXISTS quote_feedback_requested_at timestamptz,
  ADD COLUMN IF NOT EXISTS quote_feedback_received_at timestamptz,
  ADD COLUMN IF NOT EXISTS quote_feedback_reason text,
  ADD COLUMN IF NOT EXISTS quote_feedback_budget_min numeric,
  ADD COLUMN IF NOT EXISTS quote_feedback_budget_max numeric,
  ADD COLUMN IF NOT EXISTS quote_feedback_still_needs_help boolean,
  ADD COLUMN IF NOT EXISTS quote_feedback_notes text,
  ADD COLUMN IF NOT EXISTS quote_feedback_admin_notes text,
  ADD COLUMN IF NOT EXISTS quote_feedback_admin_reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS quote_feedback_admin_decision text,
  ADD COLUMN IF NOT EXISTS quote_feedback_released_at timestamptz,
  ADD COLUMN IF NOT EXISTS quote_feedback_last_outcome text;

NOTIFY pgrst, 'reload schema';
