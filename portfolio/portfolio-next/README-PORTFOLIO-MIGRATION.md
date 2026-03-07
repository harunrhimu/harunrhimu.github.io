Migration Proof-of-Concept (Next.js)

This folder is a migration POC of your Vite React portfolio to Next.js (App Router) with Tailwind.

Quick start

1. Copy real EmailJS keys into `.env.local` (do NOT commit):

   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_...
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_...
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...

2. Install deps (if needed):

   npm install

3. Run dev server:

   npm run dev

What's included

- `src/components` contains `Navbar`, `Hero`, `Footer` adapted for Next.js client components.
- `src/app/page.tsx` mounts the components as a basic landing page.
- `tailwind.config.js` and `src/app/globals.css` reuse your project's styling tokens.

Next steps

- Review the POC visually and confirm design parity.
- I will continue migrating other components and pages after your approval.
