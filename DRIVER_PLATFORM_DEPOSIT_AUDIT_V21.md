# Driver Platform Deposit Clarity Audit V21

## Reason for change
On the driver quote form, the breakdown showed:

- Total quote
- Booking deposit
- Customer pays you on moving day

This could make a driver think the booking deposit is paid to them. The business model is that the customer pays the booking deposit to Man and Van Club. The deposit is deducted from the mover's total quote, and the mover collects the remaining balance from the customer on moving day.

## Files changed

- `src/app/marketplace/DriverMarketplaceClient.tsx`
- `src/app/api/webhooks/stripe/route.ts`

## Changes made

### Driver marketplace quote form
Changed the quote option breakdown to:

- Customer total quote
- Man & Van Club booking deposit
- You collect on moving day

Added note:

> The booking deposit is paid to Man & Van Club and deducted from your total quote. You collect the remaining balance from the customer on moving day.

### Driver marketplace job cards
Changed own-job income breakdown labels from ambiguous booking deposit language to:

- Man & Van Club booking deposit
- You collect on moving day

### Driver marketplace status messages
Updated waiting/booked messages to explain that the booking deposit is the Man & Van Club booking deposit.

### Mover booking-confirmed email
Updated the mover email to say:

- Man and Van Club booking deposit paid
- Customer pays you on moving day

## Business logic audit

No business logic was changed.

Not changed:

- Stripe checkout
- webhook validation
- booking deposit calculation
- selected quote option validation
- customer detail release rules
- OTP
- quote expiry
- driver matching
- no-show logic
- guide price or route estimate logic

This is a copy/label clarity change only.
