# Him Yoga — Prenatal & Postnatal Health & Yoga

A calming, responsive single-page site for prenatal and postnatal yoga classes.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**

## Customization

- **Google Forms:** In `app/page.tsx`, replace `YOUR_PRENATAL_FORM_ID` and `YOUR_POSTNATAL_FORM_ID` with your form IDs, or set `PRENATAL_FORM_URL` and `POSTNATAL_FORM_URL` to the full form URLs.
- **Contact API:** `app/api/contact/route.ts` is ready for future database or email integration.
- **Footer:** Update `hello@himyoga.com` and social links in `components/Footer.tsx`.
- **Images:** Replace the placeholders in the Prenatal and Postnatal sections with real images (e.g. via `next/image` and your assets).

## Build

```bash
npm run build
npm start
```
