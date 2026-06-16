# Browser Back + Postcode Validation Audit V16

## Issue found

Two separate quote-form issues were confirmed:

1. The visible form Back button could move customers back correctly, but the browser/device back button was not part of the quote-form state. When the form changed height, the browser could restore the old scroll position and place the customer near the How It Works section instead of the previous quote step.
2. Postcode inputs only required a minimum length. This allowed city names such as `birmingham`, `bournemouth` and `edinburgh` to progress into the guide price flow, which could show a broad fallback guide price instead of a postcode-to-postcode route guide.

## Files changed

- `src/components/QuoteForm.tsx`
- `src/app/api/move-request/route.ts`

## Fix 1: browser/device back now controls quote steps

`QuoteForm.tsx` now writes quote-form step states into browser history:

- Step 1 = move details
- Step 2 = guide price + contact details
- Step 3 = OTP verification
- Step 4 = success

Expected behaviour:

- Fill move details -> Continue -> contact/guide price
- Press browser/device back -> returns to filled move details, not How It Works
- Submit contact details -> OTP verification
- Press browser/device back -> returns to contact details
- Verify OTP -> success
- Press browser/device back -> returns to OTP step

The form details are still held by React Hook Form state, so the customer can edit what they previously entered.

## Fix 2: visible Back button removed

The contact-step Back button has been removed so customers use the browser/device back button naturally.

## Fix 3: city names blocked from postcode fields

Postcode fields now:

- accept uppercase letters, numbers and spaces only
- prevent long city names being typed as fake route inputs
- normalise valid postcodes such as `ws86fg` to `WS8 6FG`
- reject non-postcodes before the customer can continue
- show the message: `Enter a full UK postcode, e.g. WS8 6FG`

Examples that should fail:

- `birmingham`
- `bournemouth`
- `edinburgh`
- `london`
- `nottingham`

Examples that should pass:

- `WS8 6FG`
- `B44 8AA`
- `LE4 7AA`
- `SW1A 1AA`
- `EC1A 1BB`
- `M1 1AE`

## Fix 4: server-side protection added

`/api/move-request` now normalises and validates collection/delivery postcodes before creating a request or sending OTP.

If someone bypasses the frontend and submits a city name directly to the API, the API returns:

```json
{
  "error": "Invalid postcode",
  "details": "Enter full UK postcodes for collection and delivery, e.g. WS8 6FG."
}
```

This protects the database and guide-price data from fake route queries.

## Unchanged areas

No changes were made to:

- Stripe
- booking deposit calculation
- webhook validation
- driver matching
- quote expiry
- quote decline/auto-return
- no-show workflow
- OTP generation/verification API
- route estimate formula
- guide price formula
- homepage layout/theme
- customer details release rules

## Manual test checklist

1. Enter `WS86FG` -> field should normalise to `WS8 6FG`.
2. Enter `birmingham` -> should not progress; error should ask for a full UK postcode.
3. Enter `bournemouth` -> should not progress.
4. Enter `WS8 6FG` to `B44 8AA` -> Continue works.
5. On contact/guide step, press browser back -> returns to filled move details.
6. On OTP step, press browser back -> returns to filled contact details.
7. Verify email -> success appears in form area, not How It Works.
