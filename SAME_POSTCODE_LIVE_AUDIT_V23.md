# Same Postcode Live Validation Audit v23

## Issue found
The v22 server-side and continue-step validation blocked identical collection/delivery postcodes, but the customer could still type the same valid postcode into both fields without seeing an immediate on-screen route error. This made it look as though same-postcode moves were accepted until the customer pressed Continue.

## Fix applied
Updated `src/components/QuoteForm.tsx` only.

- Watches collection and delivery postcode values live.
- Normalises both values before comparison.
- If both are valid UK postcodes and they match, the form immediately shows:
  `Collection and delivery postcodes must be different.`
- The Step 1 Continue button is disabled while the same-postcode route error is active.
- Existing v22 protections remain in place:
  - on-step Continue guard
  - Zod superRefine guard
  - `/api/route-estimate` server-side guard
  - `/api/move-request` server-side guard

## Scope
Only customer-facing live validation was tightened. No pricing, postcode formula, guide-price calculation, route lookup, OTP, Stripe, driver matching, quote expiry, no-show, emails, homepage, header, footer or payment logic was changed.

## Test cases
- `WS8 6FG` → `WS8 6FG`: immediate error and Continue disabled.
- `WS86FG` → `WS8 6FG`: normalises and shows same-postcode error.
- `WS8 6FG` → `B44 8AA`: no same-postcode error, Continue allowed if other required fields pass.
- `birmingham`: still rejected by v22 postcode sanitisation/validation.
- `0` items for Man & Van: still blocked by v22 validation.
