-- Driver approved service types. The apply-to-join form already collects
-- these checkboxes but they were never persisted. Marketplace filtering
-- and quote-submission validation use them to only show/allow jobs
-- matching the driver's approved services.
--
-- Columns are nullable on purpose: legacy applications (created before
-- these columns existed) have NULL in all columns and are treated as
-- general man-and-van (allowed) until an admin records their services.

ALTER TABLE public.driver_applications
  ADD COLUMN IF NOT EXISTS service_house boolean,
  ADD COLUMN IF NOT EXISTS service_flat boolean,
  ADD COLUMN IF NOT EXISTS service_student boolean,
  ADD COLUMN IF NOT EXISTS service_furniture boolean,
  ADD COLUMN IF NOT EXISTS service_office boolean,
  ADD COLUMN IF NOT EXISTS service_single boolean,
  ADD COLUMN IF NOT EXISTS service_long_distance boolean;
