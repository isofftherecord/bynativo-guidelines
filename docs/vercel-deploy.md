# Vercel deploy checklist

1. **Import** `bynativo-guidelines` in Vercel → Framework: Next.js → Root directory: project root.
2. **Environment variables** (Production + Preview): copy from `.env.example`. Set `USE_SEED_FALLBACK=false` after seeding.
3. **Sanity CORS**: allow `https://*.vercel.app` and your production domain.
4. **Webhook**: Sanity → URL `https://YOUR_DOMAIN/api/revalidate`, secret = `SANITY_REVALIDATE_SECRET`.
5. **Domain**: attach `guidelines.bynativo.com` (phase 2: per-brand custom domains).
6. **Resend**: verify sending domain; set `RESEND_FROM` to that domain.
7. **Smoke test**: `/`, `/b/801/logos`, `/studio`, `POST /api/share-download`.

Optional: install Sanity from the Vercel Marketplace to auto-provision project env vars.
