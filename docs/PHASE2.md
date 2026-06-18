# Digiteq Phase 2 — operating platform

Phase 2 turns Digiteq from a marketing site into a holding company operating system at **app.digiteq.io**.

## Product areas (v1 shipped)

| Area | Route | Roles |
|------|-------|-------|
| Auth + app shell | `/`, `/login` | all |
| Acquisition pipeline | `/pipeline`, `/pipeline/[id]` | internal |
| Founder dashboard | `/founder` | internal, founder |
| Investor portal | `/investor` | internal, investor |
| Venture directory | `/ventures` | internal |
| Portfolio search | `/search` | internal |
| Ventures microsite | `/ventures-site` | public |
| Investment webhook | `POST /api/webhooks/investment-inbound` | secret header |

## Stack

- **Next.js 15** — `apps/portal`
- **Clerk** — auth + SSO foundation (shared org across Digiteq, BMKRS, FNM)
- **Postgres (Neon)** — Prisma models for pipeline, ventures, investor docs, search index
- **Sanity** — read-only portfolio/insights for dashboards and search sync

## Setup

```bash
cd apps/portal
cp .env.example .env.local
npm install --legacy-peer-deps
npm run db:push
npm run db:seed
npm run dev
```

Portal runs on [http://localhost:3001](http://localhost:3001).

## Clerk roles

Set `publicMetadata` on Clerk users:

```json
{ "role": "INTERNAL" }
{ "role": "FOUNDER", "companySlug": "bmkrs" }
{ "role": "INVESTOR" }
```

## Marketing → pipeline

When both sites are deployed, set on **digiteq.io**:

- `MARKETING_INVESTMENT_WEBHOOK_URL=https://app.digiteq.io/api/webhooks/investment-inbound`
- `PORTAL_INBOUND_SECRET` (same value on portal)

Investment form submissions create `PipelineDeal` records with stage `NEW`.

## Vercel deployment

Separate Vercel project:

- Root directory: `apps/portal`
- Domain: `app.digiteq.io`
- Optional ventures microsite domain: `ventures.digiteq.io` → `/ventures-site`

## AI search (optional)

Keyword search works without configuration. Set `AI_GATEWAY_API_KEY` for result summaries via Vercel AI Gateway.

## SSO across properties

Use one Clerk application with satellite domains:

- `app.digiteq.io`
- `app.bmkrs.com`
- Future FNM app domain

See [Clerk satellite domains](https://clerk.com/docs/advanced-usage/satellite-domains).

## What is not in v1

- Full LP performance reporting (no fabricated metrics)
- HubSpot bi-directional sync
- Portable Text insight rendering in portal
- pgvector embeddings (keyword search only for now)
