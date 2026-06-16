# Local route guide audit v24

## Issue found
The route estimate helper used a hard minimum of 2.5 miles for moves inside the same outcode. That meant two nearby postcodes such as `WS8 6FG` and `WS8 6TB` could display as `2.5 miles · 12 mins`, even though they are in the same postcode sector and should be treated as a very local route.

## Fix made
- Removed the artificial 2.5-mile local display floor from `src/lib/route-estimate.ts`.
- Added postcode sector detection, e.g. `WS8 6FG` and `WS8 6TB` are both treated as the `WS8 6` sector.
- Same-sector moves now use a short local route estimate instead of being inflated to 2.5 miles.
- Same-sector route estimates are tagged with a `local-sector` provider.
- The quote form now displays same-sector routes as `Local postcode area · short local route` instead of showing a misleading mileage value.

## What is still blocked
Exact same full postcode remains blocked, for example:
- `WS8 6FG` → `WS8 6FG`
- `ws86fg` → `WS8 6FG`

## What remains allowed
Different full postcodes in the same local sector remain allowed because they can be genuine local moves, for example:
- `WS8 6FG` → `WS8 6TB`

The customer-facing route guide will no longer say these are 2.5 miles by default.

## Files changed
- `src/lib/route-estimate.ts`
- `src/components/QuoteForm.tsx`

## Not changed
No Stripe, booking deposit, webhook, OTP, driver matching, quote expiry, no-show, email, homepage, footer, or pricing business model logic was changed.
