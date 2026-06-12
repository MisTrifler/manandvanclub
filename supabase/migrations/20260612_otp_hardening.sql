-- Customer OTP hardening: expiry, attempt limiting and lockout.
-- Codes are now 6 digits (crypto-secure), valid for 15 minutes,
-- with a maximum of 5 failed attempts before lockout.

ALTER TABLE public.move_requests
  ADD COLUMN IF NOT EXISTS otp_attempts integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS otp_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS otp_locked_at timestamptz;

NOTIFY pgrst, 'reload schema';
