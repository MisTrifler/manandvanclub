# Final Go-Live Notes

This ZIP has been updated to align Man and Van Club with the customer-paid booking fee marketplace model.

## Implemented

- Replaced old driver-paid lead/unlock public flow with customer-paid booking fee wording.
- Booking fees are whole-pound values: £10, £15, £25, £35, £50.
- Movers submit quotes for free in the main marketplace flow.
- Customers accept or decline a mover quote from a secure quote-review token link.
- Customer details are released only after booking fee payment and only to the quoted mover.
- Stripe checkout uses visible product name: `Booking Fee`.
- Stripe webhook recalculates booking fee server-side and blocks underpayments from releasing details.
- Public pages updated: homepage schema/copy, pricing, how-it-works, terms, generated location FAQs and city/service trust copy.
- Added complete Supabase migration: `supabase/migrations/20260611_customer_booking_fee_flow_complete.sql`.
- Removed dependency on `next/font/google` so builds are not blocked by Google Fonts network fetches.

## Required before testing payments

1. Upload/deploy this ZIP to GitHub/Vercel.
2. Run the Supabase SQL migration in Supabase SQL Editor.
3. Configure Stripe webhook:
   - Endpoint: `https://www.manandvanclub.co.uk/api/webhooks/stripe`
   - Event: `checkout.session.completed`
4. Confirm Vercel environment variables:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `DRIVER_SESSION_SECRET`
   - `ADMIN_PORTAL_SECRET`

## Validation run in this workspace

- `npm ci --no-audit --no-fund`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: compiled successfully and passed type/lint phase, then the sandbox timed out/terminated during Next static page-data collection. This appears to be a sandbox resource limit; no TypeScript errors remained.
- `npm run lint`: Next prompted to configure ESLint, so it was not configured.

## Controlled test-mode checklist

1. Submit customer quote request.
2. Verify OTP/email.
3. Confirm request appears in mover marketplace with no customer contact details.
4. Mover submits quote.
5. Customer opens quote-review link.
6. Decline one quote and confirm details are not released.
7. Create a second request.
8. Mover submits quote.
9. Customer accepts quote.
10. Stripe Checkout shows `Booking Fee` and correct whole-pound amount.
11. Complete Stripe test payment.
12. Webhook marks request `booked`, sets `booking_fee_paid = true`, and sets `customer_details_released_at`.
13. Customer receives confirmation email.
14. Quoted mover receives customer details email.
15. Quoted mover can view customer details in marketplace.
16. Another mover cannot view customer details.
