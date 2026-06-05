# Man & Van Club Rebuild

This is the complete rebuild of manandvanclub.co.uk from a cleaning services site into a UK-wide man & van lead-generation marketplace.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion (ready for use)

## Project Structure
- `src/app`: Contains all pages and routing.
  - `page.tsx`: Homepage with hero and multi-step quote form.
  - `how-it-works/`: Detailed process page.
  - `for-businesses/`: Driver signup and pricing.
  - `[slug]/`: Dynamic template for City and Service SEO pages.
  - `marketplace/`: Driver dashboard shell.
- `src/components`: Reusable UI components.
  - `QuoteForm.tsx`: The core multi-step estimation engine.
  - `Header.tsx` & `Footer.tsx`: Brand-consistent navigation.
- `tailwind.config.ts`: Defined brand colors (Deep Navy, Orange, etc.) and typography.

## Deployment on Vercel
1. Push this code to a GitHub repository.
2. Connect the repository to Vercel.
3. Set up environment variables for future integrations (Stripe, Twilio, Supabase).
4. The site is optimized for 90+ PageSpeed scores out of the box.

## SEO & Migration
- Permanent 301 redirects are configured in `next.config.mjs` to map old cleaning URLs to the new structure.
- Schema markup and Meta tags are structured within the layout and page templates.

## How to download
Run the following command in the terminal to create a zip file for upload:
`zip -r manandvanclub-new.zip . -x "node_modules/*" ".next/*" ".git/*"`
