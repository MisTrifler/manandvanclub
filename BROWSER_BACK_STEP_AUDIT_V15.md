# Browser Back Step Fix v15

## Issue audited
Customers could use the visible form Back button correctly, but using the browser/device back button after moving to the contact/guide-price step could restore the page's previous scroll position and land around the homepage "How It Works" section.

## Root cause
The quote form is a multi-step React state machine inside the homepage, not a separate route per step. The browser did not have form-step history entries, so the device/browser back button returned to earlier page history or restored old scroll offsets instead of moving from Step 2 back to Step 1.

## Fix applied
- Added History API support inside `QuoteForm.tsx`.
- Each form step change now pushes a browser history state for that step.
- Browser/device back now restores the previous quote-form step.
- `history.scrollRestoration` is set to `manual` while the quote form is mounted to prevent the browser restoring the old homepage scroll position.
- Step restoration waits for React/layout before scrolling to the active form section.
- Removed the internal visible `Back` button from the contact step, so customers naturally use their browser/device back control.

## Expected behaviour
1. Customer fills Step 1 move details.
2. Customer clicks Continue.
3. Step 2 contact/guide-price page appears.
4. Customer presses browser/device back.
5. Form returns to Step 1 with the previously entered move details still filled.
6. Page stays focused on the quote form, not the How It Works section.

## Safety checks
- Only `src/components/QuoteForm.tsx` was changed.
- No backend API logic changed.
- No Stripe/payment/deposit/webhook logic changed.
- No OTP API logic changed.
- No guide price formula logic changed.
- No route estimate API logic changed.
- No driver marketplace, quote expiry, no-show, or customer detail release logic changed.
- 6-digit OTP UI remains intact.
- Guide price wording remains: "accurate quote".
