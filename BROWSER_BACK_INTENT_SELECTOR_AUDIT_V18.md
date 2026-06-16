# Browser back from move-type selector fix v18

## Issue
When a customer clicked a move type such as **Man & Van** and immediately pressed the browser/device Back button, the page could jump down to the **How It Works** section instead of returning to the original landing/selector state.

## Root cause
The quote form was replacing the current browser history state with an internal quote-form step state on mount. Selecting a move type did not create a separate browser history entry for the selected-intent state. As a result, the browser Back action could restore an unrelated page scroll position rather than returning to the quote-form selector.

## Fix
- Added an explicit internal `SELECT_INTENT_STEP` state for the move-type selector.
- Initial homepage quote-form state is now stored as selector step `0`.
- Selecting a move type pushes a new browser history entry for step `1` with the selected intent.
- Pressing browser/device Back from the first form step now returns to the move-type selector inside the premium landing/form area.
- Pressing browser/device Back from later steps still works as before:
  - contact/details step -> entered move details step
  - OTP step -> contact/details step
  - success step -> OTP step
- The form continues to use manual scroll restoration while active so it stays focused on the quote form rather than jumping to lower sections.

## Files changed
- `src/components/QuoteForm.tsx`

## Not changed
No pricing, guide-price formula, postcode validation, route estimate, OTP API, Stripe, webhook, driver matching, quote expiry, no-show, customer details release, homepage theme, footer or header logic was changed.

## Test checklist
1. Open homepage at the landing quote form.
2. Click **Man & Van**.
3. Press the browser/device Back button immediately.
4. Expected: returns to the move-type selector/landing form area.
5. Not expected: jumps to **How It Works**.
6. Select **Man & Van** again, fill details, Continue.
7. Press browser/device Back from contact step.
8. Expected: returns to filled move details.
