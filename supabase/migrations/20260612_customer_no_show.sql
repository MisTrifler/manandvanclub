-- Customer no-show policy + admin review workflow.
-- Status convention: null | reported | customer_notified | disputed |
--                    approved | rejected | resolved
-- Payout convention: null | not_applicable | pending_manual_payout |
--                    paid_manually | cancelled
-- NOTE: no automatic payouts or refunds. Compensation amounts are
-- recorded for manual admin handling only.

ALTER TABLE public.move_requests
  ADD COLUMN IF NOT EXISTS customer_no_show_status text,
  ADD COLUMN IF NOT EXISTS customer_no_show_reported_at timestamptz,
  ADD COLUMN IF NOT EXISTS customer_no_show_reported_by text,
  ADD COLUMN IF NOT EXISTS customer_no_show_wait_minutes integer,
  ADD COLUMN IF NOT EXISTS customer_no_show_contact_attempts integer,
  ADD COLUMN IF NOT EXISTS customer_no_show_message_sent boolean,
  ADD COLUMN IF NOT EXISTS customer_no_show_evidence_notes text,
  ADD COLUMN IF NOT EXISTS customer_no_show_admin_notes text,
  ADD COLUMN IF NOT EXISTS customer_no_show_customer_dispute_until timestamptz,
  ADD COLUMN IF NOT EXISTS customer_no_show_customer_disputed_at timestamptz,
  ADD COLUMN IF NOT EXISTS customer_no_show_customer_dispute_reason text,
  ADD COLUMN IF NOT EXISTS customer_no_show_admin_decision_at timestamptz,
  ADD COLUMN IF NOT EXISTS customer_no_show_admin_decision_by text,
  ADD COLUMN IF NOT EXISTS customer_no_show_mover_compensation_amount numeric,
  ADD COLUMN IF NOT EXISTS customer_no_show_platform_retained_amount numeric,
  ADD COLUMN IF NOT EXISTS customer_no_show_payout_status text,
  ADD COLUMN IF NOT EXISTS customer_no_show_payout_reference text;

NOTIFY pgrst, 'reload schema';
