# Storage Collection Form Audit v25

## Goal
Reduce unnecessary customer questions in the storage collection flow while preserving enough detail for a mover to review and quote.

## What changed
- Removed the `Direction` question from the storage form.
  - The form already asks for a storage postcode and delivery postcode, so direction was unnecessary and added friction.
- Reordered storage fields so the route essentials come first:
  1. Storage postcode
  2. Delivery postcode
  3. Move date
  4. What needs moving?
  5. Storage unit size
  6. Storage facility name
- Renamed `Collection Postcode` to `Storage Postcode` for clarity.
- Replaced postcode placeholders with the generic example `SW1A 1AA`.
- Renamed `Items to Collect` to `What Needs Moving?`.
- Made `What Needs Moving?` required for storage requests.
- Made `Storage Unit Size` easier by defaulting the first option to `Not sure`.
- Made `Storage Facility Name` visibly optional.

## Business model alignment
The storage form now collects only the minimum information needed to let a verified mover review the request and send an accurate quote:
- route postcodes
- date
- item description
- optional unit/facility context

## Not changed
- No payment logic changed.
- No Stripe or booking deposit logic changed.
- No OTP flow changed.
- No guide price formula changed.
- No route estimate calculation changed.
- No driver matching, expiry, no-show, or customer detail release logic changed.

## Files changed
- `src/components/QuoteForm.tsx`
