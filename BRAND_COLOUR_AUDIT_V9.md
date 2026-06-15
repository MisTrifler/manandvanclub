# Brand colour audit v9

## Goal
Make the logo treatment consistent with the Man & Van Club theme:

- `&` inside `M&V` uses the orange accent.
- `CLUB` in the wordmark uses the orange accent.
- The navy/orange theme is preserved.
- No quote, payment, OTP, driver matching, expiry, route estimate or backend business logic was changed.

## Files audited and updated

### Shared UI
- `src/components/BrandLogo.tsx` added as the single reusable brand mark/wordmark component.
- `src/components/Header.tsx` now uses the shared brand logo.
- `src/components/Footer.tsx` now uses the shared brand logo and orange `CLUB`.
- `src/app/login/page.tsx` now uses the shared brand logo.
- `src/app/admin/mover-recruitment/RecruitmentCRM.tsx` now uses the shared brand logo.
- `src/app/quote-review/[token]/QuoteReviewClient.tsx` now uses the shared brand icon.
- `src/app/quote-feedback/[token]/QuoteFeedbackClient.tsx` now uses the shared brand icon.
- `src/app/no-show-dispute/[token]/NoShowDisputeClient.tsx` now uses the shared brand icon.

### Email brand marks
The `M&V` email badge has been updated so the ampersand is orange in:

- `src/app/api/move-request/route.ts`
- `src/app/api/verify-otp/route.ts`
- `src/app/api/mover/submit-quote/route.ts`
- `src/app/api/webhooks/stripe/route.ts`
- `src/lib/quote-feedback-email.ts`
- `src/app/api/driver/send-login-code/route.ts`
- `src/app/api/mover/report-no-show/route.ts`
- `src/app/api/admin/no-show/route.ts`
- `src/app/api/customer/no-show-dispute/route.ts`

### Public icons
The public app/favicons were updated so the ampersand is orange:

- `public/icon.png`
- `public/favicon.png`
- `public/favicon.ico`
- `public/apple-icon.png`
- `public/apple-touch-icon.png`

## Audit checks

- No customer-facing quote wording was changed.
- No backend API behaviour was changed.
- No payment/deposit logic was changed.
- No OTP logic was changed.
- No marketplace/driver visibility logic was changed.
- No layout/scroll behaviour was changed.

## Notes
This is a branding-only update based on the screenshot feedback. The footer now shows `MAN&VAN CLUB` with both the `&` and `CLUB` in the existing accent orange.
