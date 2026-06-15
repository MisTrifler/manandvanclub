# Back Step / Form Retention Audit v14

## Issue found
When the customer is part-way through the quote form and clicks **Back** from the contact/guide-price step, the page can appear to drop down into the homepage content below the form, including the **How It Works** section.

The entered form data was already being retained by `react-hook-form`; the problem was scroll position. When the form changes from one step layout to another, the browser can keep the previous scroll offset while the form height changes. That makes the viewport land below the form instead of on the previous details step.

## Fix applied
Only `src/components/QuoteForm.tsx` was changed.

Changes:
- Added a central `goToStep()` helper for all form-step navigation.
- Made every step change trigger a controlled scroll back to the active quote-form step.
- Added a double `requestAnimationFrame()` wait so scrolling happens after React has rendered the next step and layout has settled.
- Updated the visible **Back** button to use `goToStep(step - 1)` instead of directly calling `setStep(step - 1)`.
- Added `type="button"` to quote-form buttons so buttons cannot accidentally behave like form submit buttons if the component is ever wrapped in a form later.

## Expected behaviour
- Step 1 details → Continue → customer lands on contact/guide-price step.
- Contact/guide-price step → Back → customer lands back on the details they already entered.
- Contact/guide-price step → Verify Email → customer lands on OTP verification.
- OTP verified → customer lands on the “You're All Set” confirmation.
- No step should drop the customer down to How It Works.

## Not changed
No changes were made to:
- backend APIs
- OTP generation/verification
- 6-digit OTP UI
- guide price calculation
- route estimate logic
- Stripe/deposits/webhook
- driver matching
- quote expiry/decline flow
- no-show logic
- homepage design/theme

## Validation notes
A full TypeScript/build run could not be completed in this sandbox because the uploaded archive does not include installed dependencies (`node_modules`). The changed file was manually audited for syntax and scoped to one component.

After applying, run:

```bash
npm run build
```

Then manually test:
1. Select a move type.
2. Fill the move details.
3. Continue to contact/guide price.
4. Click Back.
5. Confirm the previously entered details remain visible and the page does not jump to How It Works.
