Mobile landing restore v4

Purpose:
- Restore the premium desktop landing page feel that existed before the /get-started split.
- Restore the van/movers background image on mobile.
- Fix the auto-scroll issue without moving the quote form onto a separate page.
- Keep the quote form on the premium homepage hero.

Key fix for auto-scroll:
- The homepage hero keeps id="quote-form" at the top of the hero.
- The inner QuoteForm wrapper has been renamed from id="quote-form" to id="move-request-form".
- This removes the duplicate quote-form anchor that could cause browsers to jump lower into the form.
- Links now point back to /#quote-form instead of /get-started.
- The /get-started page now redirects back to /#quote-form so older links do not leave users on the stripped-down page.

Copy fixes:
- Replaced repeated quote-led form wording with move-request wording.
- The form starts with "Start Your Move Request" and "Move Request" once in progress.
- The primary first-step button says "Continue" instead of "Continue to free quote".
- The estimate step label is now "Guide Price Range" and says it is a guide price range, not a confirmed mover quote.

Files included:
- src/app/HomeContent.tsx
- src/app/get-started/page.tsx
- src/app/how-it-works/HowItWorksContent.tsx
- src/app/pricing/page.tsx
- src/components/Footer.tsx
- src/components/Header.tsx
- src/components/MobileStickyCTA.tsx
- src/components/QuoteForm.tsx

After applying:
1. Run npm run build.
2. Test homepage on desktop and mobile.
3. Confirm the page opens at the very top on a clean URL.
4. Confirm /#quote-form lands at the top of the hero, not halfway into the form.
5. Confirm the mobile hero shows the van/movers background image.
6. Confirm the quote form still submits.

Note:
This package is based on the previous v3 zip baseline. It does not intentionally change backend, payment, Stripe, OTP, driver matching, or quote expiry logic.
