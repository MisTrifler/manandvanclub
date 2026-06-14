Mobile homepage fix v2

Changed files:
- src/app/HomeContent.tsx
- src/components/IntentSelector.tsx

Important:
- This version deliberately does NOT include src/components/QuoteForm.tsx.
- Do not replace QuoteForm.tsx with the earlier mobile homepage zip version, because that file can overwrite newer quote/OTP/payment work.
- This patch only changes the mobile homepage opening and move-type selector.

What changed:
- Mobile homepage now uses a dedicated compact mobile hero instead of stacking the full desktop image hero.
- Mobile headline/trust copy appears in a short navy card.
- Quote form is pulled closer to the top of the first screen.
- The first mobile view is less crowded and easier to read.
- Move-type buttons use fixed comfortable mobile heights and no touch hover scripts.
- Office / Storage / Student remain behind More move types on mobile.
- Desktop/tablet image hero remains available from lg and up.

After applying:
- Run npm run build.
- Test at 390px, 430px, and 768px widths.
- Confirm all six move types still select correctly.
