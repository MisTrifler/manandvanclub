# Step Scroll Fix v10 Audit

## Issue fixed
After OTP verification the quote form becomes much shorter, so the browser can keep the previous scroll position and leave the customer looking further down the homepage near the How It Works section.

## Change made
Only `src/components/QuoteForm.tsx` was changed.

The quote form now has controlled scroll targets:
- the form shell has a stable ref
- the currently active step has a ref
- every step change scrolls the customer back to the relevant active step
- successful OTP verification scrolls directly to the `You're All Set` success message
- choosing/changing the move type also keeps the user in the quote form area

## Expected behaviour
1. Move type/details -> Continue: scrolls to the contact/guide price step.
2. Contact details -> Verify Email: scrolls to the OTP verification step.
3. OTP verified: scrolls to the `You're All Set` success message.
4. Back/change actions keep the customer in the relevant quote form area.
5. The page should no longer land on the How It Works section after verification.

## Protected areas
No changes were made to:
- backend APIs
- OTP generation or verification logic
- Stripe/payment/deposit logic
- quote expiry/decline logic
- driver matching
- no-show logic
- route estimate calculation
- guide price calculation
- homepage design/header/footer/theme

## Five audit checks completed
1. Changed-file audit: only `src/components/QuoteForm.tsx` differs from the v9 source.
2. Scroll-control audit: refs, step scroll handler, sticky header offset, and success-state positioning are present.
3. Journey copy audit: 6-digit OTP copy, guide price copy, and booking deposit copy are preserved.
4. Business-logic audit: no backend/payment/driver files changed.
5. Dangerous-scroll audit: no hash rewrite, no `scrollIntoView`, and no `quote-form` forced scroll were added.

## Local build note
This sandbox copy does not include `node_modules`, so a full Next build could not be completed here. Run `npm run build` after applying the zip.
