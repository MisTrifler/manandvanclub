-- Insurance verification (admin-confirmed) for driver applications.
-- has_insurance remains applicant self-acknowledgement only.
-- insurance_verified is set by admin after insurance documents are
-- emailed to support@manandvanclub.co.uk and manually checked.

ALTER TABLE public.driver_applications
  ADD COLUMN IF NOT EXISTS insurance_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS insurance_verified_at timestamptz,
  ADD COLUMN IF NOT EXISTS insurance_notes text;

COMMENT ON COLUMN public.driver_applications.insurance_verified IS
  'Set true by admin only after Goods in Transit and Public Liability insurance documents have been received by email and manually checked. Approval requires this to be true.';
