# SVN PRODUCT — LION Digital Catalog

Premium B2B catalog website for **LION** wall hooks & hangers by **SVN PRODUCT** (Ludhiana).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Inquiry emails via [Resend](https://resend.com) → `INFO.SVNPRODUCT@GMAIL.COM`

## Develop

```bash
cd web
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin panel

Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

Default password (change in `.env.local`):

```
ADMIN_PASSWORD=svnadmin2026
AUTH_SECRET=replace-with-a-long-random-string
```

Features:
- Add / edit / delete products with photo upload
- Publish / hide / feature on homepage
- View wholesale inquiries
- Edit company settings (About copy, WhatsApp, email)

Data is stored in `data/store.json`. Uploaded photos go to `public/uploads/`.

## Email setup

1. Create a Resend account and API key
2. Set `RESEND_API_KEY` in `.env.local`
3. Set `INQUIRY_TO_EMAIL=INFO.SVNPRODUCT@GMAIL.COM`
4. Verify a sending domain (or use `onboarding@resend.dev` for tests)

Without `RESEND_API_KEY`, inquiries are logged in the server console (dev fallback).

## WhatsApp

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (E.164 without `+`, e.g. `9198XXXXXXXX`) for WhatsApp CTAs. Without it, the link falls back to email.

## Content

- Product data: `src/data/products.ts`
- Company copy / partner: `src/lib/site.ts`
- Product images: `public/products/` (from Lion Catalogue PDF)
