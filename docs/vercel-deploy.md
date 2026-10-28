# Vercel deploy checklist

1. **Import** `bynativo-guidelines` in Vercel → Framework: Next.js → Root directory: project root.
2. **Environment variables** (Production + Preview):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET=production`
   - `NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01` (must be `YYYY-MM-DD`, not empty/`latest`)
   - `SANITY_API_READ_TOKEN` (and write token only if you seed from CI)
   - `USE_SEED_FALLBACK=false` after seeding
   - optional: `SANITY_REVALIDATE_SECRET`, `RESEND_API_KEY`, `RESEND_FROM`
3. **Sanity CORS**: allow `https://*.vercel.app` and your production domain.
4. **Webhook**: Sanity → URL `https://YOUR_DOMAIN/api/revalidate`, secret = `SANITY_REVALIDATE_SECRET`.
5. **Domain**: attach `guidelines.bynativo.com` (phase 2: per-brand custom domains).
6. **Resend**: verify sending domain; set `RESEND_FROM` to that domain.
7. **Smoke test**: `/`, `/b/801/logos`, `/studio`, `POST /api/share-download`.

Optional: install Sanity from the Vercel Marketplace to auto-provision project env vars.
