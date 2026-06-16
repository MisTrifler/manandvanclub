# Homepage Alignment Audit v20

Issue reviewed from screenshot: the homepage lower trust/service sections looked visually misaligned after the area-page/business-model update. The main issue was inconsistent section widths and grid sizing between:

- We Verify Businesses Before They Join
- Popular Moving Services
- Popular Areas We Cover

The verification and services sections used narrower containers and different card sizing, which made the page feel uneven on desktop. Seven service cards were also forced into a tight row without consistent card height.

## Fix applied

Changed `src/app/HomeContent.tsx` only.

- Standardised these sections to `max-w-6xl` containers.
- Added consistent vertical padding: `py-14 lg:py-16`.
- Added equal-height cards for verification checks and service cards.
- Kept cards centred and aligned across desktop/tablet/mobile.
- Changed the service grid to behave more gracefully: 2 columns on mobile, 3 on small screens, 4 on large screens, 7 on extra-large screens.
- Added equal-height Popular Areas cards.

## Not changed

No quote form, Stripe, OTP, pricing, guide price, route estimate, postcode validation, driver logic, area-page content, header, footer, or backend logic was changed.

## Test checklist

Check the homepage at:

- 390px mobile
- 768px tablet
- 1440px desktop
- 1920px desktop

Expected:

- Verification cards align consistently.
- Popular Moving Services cards are evenly sized and centred.
- Popular Areas cards align consistently.
- No horizontal overflow.
- Header/hero/form remain unchanged.
