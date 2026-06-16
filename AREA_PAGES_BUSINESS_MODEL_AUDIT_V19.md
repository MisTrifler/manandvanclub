# Area pages business-model audit v19

## Pages audited
- `/man-and-van-london`
- `/man-and-van-leeds`
- `/man-and-van-bristol`
- Shared area-page component and data generators used by all generated area pages.

## Problems found
The live area pages had good SEO depth but several claims were stronger than the Man and Van Club business model:

- Hero badges such as “London's Trusted Movers”, “Leeds' Local Experts”, and “Bristol's Local Experts” made the site sound like the mover/operator.
- “£50+ From Local” could set a fixed low-price expectation.
- “Fully Vetted” and repeated “vetted” wording were inconsistent with the current preferred “verified mover” language.
- Copy such as “our movers know every shortcut” overpromised local knowledge.
- Area content used “our local movers” and “our matched movers know…” too often, which could imply movers are employees or guaranteed experts.
- JSON-LD used `LocalBusiness`, which can make the page look like Man and Van Club itself is a local moving company in each city.

## Business model alignment applied
The area pages now describe Man and Van Club as:

- a quote-request marketplace
- free to submit
- one verified mover can review anonymised move details
- contact details stay private until the customer accepts a quote and pays the booking deposit
- the booking deposit is deducted from the mover's quote
- the customer decides whether to book after quote options are sent

## Files changed
- `src/components/CityServiceContent.tsx`
- `src/lib/location-content.ts`
- `src/lib/custom-location-content.ts`
- `src/lib/enhanced-schemas.ts`

## What changed
- Hero badge now uses “Verified movers in [City]”.
- Hero proof points now use “Free to Submit”, “Verified Movers”, and “Details Protected”.
- Removed “£50+ From Local”.
- Replaced “Fully Vetted” with “Checked Applications”.
- Replaced overclaiming local copy with safer access/parking/quote-review wording.
- CTA copy now says “Start Your Move Request”.
- Area page descriptions and metadata now explain the secure quote request process.
- Enhanced schema changed from `LocalBusiness` style language to `Service` style language.
- FAQ wording now explains guide pricing, verified mover review, booking deposit, and privacy more accurately.

## Business logic untouched
No changes were made to quote form state, postcode validation, guide price calculation, route estimate, OTP, Stripe, booking deposit, driver matching, quote expiry, no-show, Supabase writes, or payment webhooks.
