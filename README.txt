Mobile sticky CTA removed (v5)

Files changed:
- src/app/layout.tsx
  - Removed the global <MobileStickyCTA /> render so the bottom mobile sticky button no longer appears.
- src/components/MobileStickyCTA.tsx
  - Converted the component into a safe no-op. This prevents older imports from reintroducing the sticky button.
- src/components/Footer.tsx
  - Removed the extra mobile bottom padding that existed only to make space for the sticky CTA.

Reason:
The sticky "Start Move Request" button could send users back to the start of the quote form after they had already started filling it in, which risked resetting their progress.

No backend, payment, OTP, driver matching, quote expiry, guide price or form-submission logic was changed.

After applying, run:
npm run build

Then test on mobile:
1. Start filling the quote form.
2. Confirm no sticky bottom "Start Move Request" button appears.
3. Confirm the form does not jump/reset from any bottom CTA.
