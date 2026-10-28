# byNativo Guidelines

Multi-brand brand guidelines platform (Standards-lite) built with **Next.js**, **Sanity Studio**, and **Vercel**.

Public sites live at `/b/[brand]/{logos,colors,typography}`. Editors use `/studio`.

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Without a Sanity project ID, the app serves curated **seed data** for:

- [801 Brickell](http://localhost:4200/b/801) → use port from `next dev` (usually `3000`)
- [Core Wynwood](/b/core-wynwood)

## Connect Sanity

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage)
2. Put IDs/tokens in `.env.local` (see `.env.example`)
3. Set `USE_SEED_FALLBACK=false`
4. Run `npm run seed` with `SANITY_API_WRITE_TOKEN`
5. Open `/studio`, upload real logo/font files onto the placeholder `assetFile` docs

## Share download email

`POST /api/share-download` with `{ "email", "assetId" }` sends a Resend email (rate-limited). In development without `RESEND_API_KEY`, it dry-runs and logs.

## Deploy on Vercel

1. Import this repo in Vercel (Framework Preset: Next.js).
2. Add environment variables from `.env.example` (Production + Preview).
3. Set Sanity CORS origins to your Vercel URL + custom domain.
4. Create a Sanity webhook → `https://YOUR_DOMAIN/api/revalidate` with secret `SANITY_REVALIDATE_SECRET` (projection can include `_type` and `slug`).
5. Attach custom domain `guidelines.bynativo.com` when ready.
6. Optional: install Sanity from the Vercel Marketplace to wire project env automatically.

### Suggested Vercel env

| Name | Notes |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Required in prod |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Date `YYYY-MM-DD` (e.g. `2025-01-01`). Invalid values fall back automatically |
| `SANITY_API_READ_TOKEN` | Viewer token for drafts/private if needed |
| `SANITY_REVALIDATE_SECRET` | Webhook secret |
| `RESEND_API_KEY` / `RESEND_FROM` | Share-download |
| `USE_SEED_FALLBACK` | `false` in production once seeded |

## Scripts

- `npm run dev` — local app + Studio
- `npm run build` — production build
- `npm run seed` — upsert 801 + Core Wynwood into Sanity
