Mobile homepage + quote page fix v3

What this changes:
- Removes the quote form from the homepage hero so the homepage no longer auto-scrolls into the form.
- Restores the mobile background image using /hero-mover-bg.png.
- Adds a dedicated /get-started page for the full move request form.
- Updates homepage/header/sticky CTA links to /get-started instead of /#quote-form.
- Adds a mobile sticky CTA component that hides on /get-started so it does not overlay the form.
- Keeps move type selection compact and less "get your quote" focused.
- Clarifies that a guide price may be shown where enough information is available, but the real mover quote comes later.

Important:
- Backend, Stripe, driver matching, OTP, route estimate, guide price, quote expiry, no-show and payment logic are not intentionally changed.
- Apply this over your current repo, then run npm run build.
