# Route / quote-form validation audit v22

## Issue found
The quote form could show a guide price for a route that did not make sense, such as entering the same full postcode for pickup and drop-off. Because the free route fallback applies a local minimum road distance, the UI could show a route like 2.5 miles / 12 minutes even when the displayed postcodes matched.

The Man & Van general form also allowed `0` items, which could create weak or fake guide-price enquiries.

## Changes made

### Frontend quote form
- Added a same-postcode validation rule.
- Collection and delivery postcodes must now be different before the customer can continue.
- Same-postcode routes no longer trigger guide-price preview calculation.
- Man & Van `Number of Items` now requires at least 1 item.
- The number input now uses `min={1}` and shows the validation error below the field.

### Route estimate API
- `/api/route-estimate` now rejects identical collection and delivery postcodes with a 400 response.

### Move request API
- `/api/move-request` now rejects identical collection and delivery postcodes server-side, so bypassing the frontend cannot create fake same-postcode enquiries.
- The same API now rejects Man & Van/general requests with fewer than 1 item.
- The postcode example in server error copy now uses `SW1A 1AA`, not a real/private customer postcode.

### Route helper library
- Postcodes.io, fallback centroid, Google Routes and sanitized client route estimates all ignore identical postcode pairs.
- This prevents route-like distances being generated for a route that should not be estimated.

## Files changed
- `src/components/QuoteForm.tsx`
- `src/app/api/route-estimate/route.ts`
- `src/app/api/move-request/route.ts`
- `src/lib/route-estimate.ts`

## Business logic not changed
No Stripe, booking deposit, webhook, OTP API, driver matching, quote expiry, no-show, email sending, customer detail release, or guide-price formula rates were changed.

## Manual tests to run
1. Pickup `WS8 6FG`, drop-off `WS8 6FG` -> should show an error and should not continue.
2. Pickup `WS8 6FG`, drop-off `B44 8AA`, items `1` -> should continue and show a local guide price.
3. Pickup `WS8 6FG`, drop-off `LE4 5AA`, items `1` -> should continue and show a higher guide price than a local move.
4. Pickup `SW1A 1AA`, drop-off `NG1 1AA`, items `1` -> should continue and show a long-distance guide price.
5. Man & Van with items `0` -> should show `Enter at least 1 item` and should not continue.
6. City names such as `birmingham`, `bournemouth`, `edinburgh` -> should not be accepted as postcodes.
