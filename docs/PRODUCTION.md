# Digiteq production runbook

How to wire **digiteq.io** (marketing) and **app.digiteq.io** (portal) for production. Use with [`docs/ROADMAP.md`](./ROADMAP.md) for tracked status.

---

## Overview

| Property | Vercel root | Domain | Purpose |
|----------|-------------|--------|---------|
| Marketing | repo root | `digiteq.io` | Public site, forms, Sanity Studio |
| Portal | `apps/portal` | `app.digiteq.io` | Auth, pipeline, founder/investor views |
| Ventures microsite (optional) | `apps/portal` | `ventures.digiteq.io` | Rewrite to `/ventures-site` |

---

## 1. Marketing site (`digiteq.io`)

### Vercel project

1. Connect the Digiteq GitHub repo.
2. Framework: **Next.js** (default).
3. Root directory: **`.`** (repository root).
4. Build command: `npm run build` (default).
5. Install command: `npm install --legacy-peer-deps`.

### Domain & site URL

- Add custom domain `digiteq.io` (and `www` redirect if desired).
- Set `NEXT_PUBLIC_SITE_URL=https://digiteq.io`.

### Environment variables

Copy from [`.env.example`](../.env.example):

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | `fr7gld8d` |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | `production` |
| `SANITY_API_TOKEN` | Yes (preview/revalidate) | Read token for server fetches |
| `SANITY_REVALIDATE_SECRET` | Yes | Shared secret for `/api/revalidate` |
| `HUBSPOT_ACCESS_TOKEN` | Yes | Private app token |
| `HUBSPOT_PORTAL_ID` | Yes | HubSpot account ID |
| `HUBSPOT_INVESTMENT_FORM_ID` | Yes | Separate form for acquisition enquiries |
| `RESEND_API_KEY` | Yes | Transactional email |
| `CONTACT_FROM_EMAIL` | Yes | e.g. `Digiteq <hello@digiteq.io>` |
| `CONTACT_TO_EMAIL` | Yes | Inbox for contact notifications |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Yes | `digiteq.io` |
| `MARKETING_INVESTMENT_WEBHOOK_URL` | When portal live | `https://app.digiteq.io/api/webhooks/investment-inbound` |
| `PORTAL_INBOUND_SECRET` | When portal live | Same value on portal project |

### Sanity webhook

Create a webhook in [Sanity manage](https://sanity.io/manage/project/fr7gld8d):

- **URL:** `https://digiteq.io/api/revalidate`
- **Trigger:** Create, update, delete (documents)
- **Secret:** same as `SANITY_REVALIDATE_SECRET`
- **HTTP method:** POST

### Resend

Verify sending domain for `digiteq.io` so `hello@digiteq.io` delivers.

### HubSpot

- Contact and newsletter forms use the main HubSpot integration.
- Investment form uses `HUBSPOT_INVESTMENT_FORM_ID` and custom properties defined in `lib/hubspot/investment.ts`.
- Create matching custom properties in HubSpot before go-live.

---

## 2. Portal (`app.digiteq.io`)

### Vercel project

Separate project from marketing:

1. Same GitHub repo.
2. Root directory: **`apps/portal`**.
3. Install: `npm install --legacy-peer-deps`.
4. Build: `npm run build`.

### Domain

- `app.digiteq.io` → portal project.
- Optional: `ventures.digiteq.io` with rewrite to `/ventures-site`.

### Environment variables

Copy from [`apps/portal/.env.example`](../apps/portal/.env.example):

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk application |
| `CLERK_SECRET_KEY` | Yes | Server-side Clerk |
| `DATABASE_URL` | Yes | Neon Postgres connection string |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Read-only CMS for dashboards |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | `production` |
| `PORTAL_INBOUND_SECRET` | Yes | Validates marketing webhook |
| `NEXT_PUBLIC_PORTAL_URL` | Yes | `https://app.digiteq.io` |
| `NEXT_PUBLIC_MARKETING_URL` | Yes | `https://digiteq.io` |
| `AI_GATEWAY_API_KEY` | No | Optional search summaries |

### Database (Neon)

After first deploy or from local with prod `DATABASE_URL`:

```bash
cd apps/portal
npm run db:push
npm run db:seed
```

### Clerk roles

Set `publicMetadata` on each user:

```json
{ "role": "INTERNAL" }
{ "role": "FOUNDER", "companySlug": "bmkrs" }
{ "role": "INVESTOR" }
```

See [`docs/PHASE2.md`](./PHASE2.md) for route access by role.

### Marketing → pipeline

On **both** Vercel projects, set the same `PORTAL_INBOUND_SECRET`.

On marketing, set `MARKETING_INVESTMENT_WEBHOOK_URL` to the portal inbound URL. Investment form submissions create `PipelineDeal` records with stage `NEW`.

---

## 3. Post-deploy verification

Run the §11 checklist in [`docs/ROADMAP.md`](./ROADMAP.md) and mark items complete there.

Quick smoke:

```bash
curl -sI https://digiteq.io/sitemap.xml
curl -sI https://digiteq.io/robots.txt
```

Local e2e (marketing):

```bash
npm run test:e2e
```

CI runs the same suite on pull requests via `.github/workflows/e2e.yml`.

---

## 4. SSO (future)

Clerk satellite domains for BMKRS/FNM are documented in `docs/PHASE2.md` but not configured in v1. Track under Phase 2.1 in `docs/ROADMAP.md`.
