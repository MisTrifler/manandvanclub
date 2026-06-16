# Conversion copy + postcode example audit v17

## What changed

1. Homepage hero subheading shortened:
   - From: `Free to submit. No spam. Your details are only shared when you accept a quote.`
   - To: `Free to submit. No spam. Your details stay private until you book.`

2. Removed the repeated lower hero trust row:
   - `UK-WIDE COVERAGE | FREE TO SUBMIT | Verified movers`
   This was repeating the trust badges and making the hero feel busier.

3. Quote form secure/GDPR copy shortened:
   - From: `Your enquiry is handled securely. Details are released only if you accept a mover quote and pay the booking deposit. The deposit is deducted from the mover quote.`
   - To: `Your details stay private until you accept a quote and pay the booking deposit. The deposit is deducted from the mover’s quote.`

4. Guide price copy shortened:
   - From: `This is only a guide price. A verified mover will review your move details and send an accurate quote before you decide whether to book.`
   - To: `This is only a guide price. A verified mover will review your details and send an accurate quote before you book.`

5. Postcode validation example changed:
   - From: `WS8 6FG`
   - To: `SW1A 1AA`
   This removes the user's own postcode from the error/help copy and uses a generic UK example.

## Files changed

- `src/app/HomeContent.tsx`
- `src/components/QuoteForm.tsx`

## Scope confirmation

No backend, Stripe, deposit, webhook, OTP API, driver matching, quote expiry, no-show, route formula, guide-price formula, or customer details release logic was changed.
