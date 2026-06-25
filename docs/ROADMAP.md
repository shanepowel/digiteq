# Digiteq roadmap & checklist

Tracked status for shipping Digiteq from “mostly built on `main`” to production-ready and Phase 2 complete.

**Baseline:** Phase 1 marketing site + Phase 2 v1 portal are on `main` (see `docs/PHASE2.md`).

Update this file as items are completed. Check boxes in PRs when you finish work.

---

## Done on `main` (do not re-implement)

### Phase 1 — marketing site

- [x] Homepage + inner pages, Sanity, forms, Studio, seeds
- [x] Integration guide deliverables: motion, per-page SEO/JSON-LD, markdown insights, legal pages, investment form + API, footer/sitemap fixes

### Phase 2 v1 — operating platform (`apps/portal`)

- [x] Clerk auth shell, pipeline, founder/investor views, venture directory, keyword search, ventures microsite, investment webhook

---

## 1. Production hardening (Phase 1.5)

Mostly ops and env configuration. Code paths exist; production wiring is outstanding.

| Item | Status | Notes |
|------|--------|-------|
| Vercel prod deploy + DNS for `digiteq.io` | [ ] | Verify project, domain, and `NEXT_PUBLIC_SITE_URL` |
| Sanity webhook → `/api/revalidate` in prod | [ ] | Set webhook + `SANITY_REVALIDATE_SECRET` on Vercel |
| HubSpot + Resend + Plausible prod env | [ ] | Keys on Vercel; verify Resend domain for `hello@digiteq.io` |
| HubSpot investment form + custom properties | [ ] | `HUBSPOT_INVESTMENT_FORM_ID` + properties in HubSpot |
| Neon `DATABASE_URL` + `db:push` / `db:seed` on portal | [x] | Neon project `digiteq-portal` (`lucky-king-95684613`); schema seeded |
| Portal deploy (`app.digiteq.io`, root `apps/portal`) | [ ] | **Vercel project not created**; see `docs/PORTAL-DEPLOY.md` |
| Clerk app + roles (`INTERNAL` / `FOUNDER` / `INVESTOR`) | [ ] | `publicMetadata.role` on users |
| `PORTAL_INBOUND_SECRET` on marketing + portal | [ ] | Wires investment form → pipeline webhook |
| Integration guide §11 verification checklist | [ ] | Manual post-deploy; see below |

### §11 post-deploy verification

From `INTEGRATION-GUIDE.md` §11 — run after production env is set:

- [ ] Contact form submits to HubSpot
- [ ] Investment form submits to HubSpot (separate pipeline)
- [ ] Newsletter subscribe works
- [ ] Plausible is tracking
- [ ] OG images render correctly (e.g. opengraph.xyz)
- [ ] JSON-LD validates (Google Rich Results Test)
- [ ] `sitemap.xml` is accessible
- [ ] `robots.txt` is accessible
- [ ] All insight articles render body content
- [ ] All footer links resolve to real pages

---

## 2. Marketing site polish / gaps

| Item | Status | Notes |
|------|--------|-------|
| `/ventures` page treatment | [x] | `PageShell`, `buildMetadata`, `VenturesPageContent` (parity with about/portfolio) |
| Case studies | [x] | `sanity/schemas/caseStudy.ts` exists; `app/case-studies/` routes implemented |
| Interactive hero | [ ] | Static `hero-3d.png`; Spline/R3F not implemented (`Hero3DMark` unused) |
| `AGENTS.md` + `docs/PRODUCTION.md` | [x] | Agent + production runbooks in repo |
| Playwright in CI | [x] | `.github/workflows/e2e.yml` on PR + `main` |

---

## 3. Phase 2 beyond v1 (deferred)

Explicitly out of Phase 2 v1 scope (`docs/PHASE2.md`).

| Item | Status | Notes |
|------|--------|-------|
| Pipeline notes UI | [ ] | Schema supports notes; UI is read-only |
| HubSpot ↔ pipeline sync | [ ] | One-way webhook only today |
| Real LP reporting | [ ] | Investor portal is structural; no real performance data |
| pgvector / semantic search | [ ] | Keyword search only |
| Portable Text insights in portal | [ ] | Markdown insights work; Sanity-only articles thin |
| `investmentOpportunity` in Sanity | [ ] | Not wired to pipeline UI (Postgres deals only) |
| Unified SSO | [ ] | Clerk satellites with BMKRS/FNM documented, not configured |
| `ventures.digiteq.io` | [ ] | Microsite route exists (`/ventures-site`); domain mapping TBD |
| Clerk → Postgres user sync | [ ] | Roles in Clerk metadata; no sync webhook to `User` table |

---

## Suggested finish order

1. **Prod config** — marketing Vercel, portal Vercel, Neon, Clerk, HubSpot, Resend, Plausible, webhooks (`docs/PRODUCTION.md`)
2. **Run verification checklist** — INTEGRATION-GUIDE §11 (above)
3. **CI** — Playwright smoke on PR (done)
4. **Quick code wins** — ventures page parity (done); case study routes (next)
5. **Polish** — interactive hero (if still wanted)
6. **Phase 2.1** — pipeline notes, HubSpot sync, SSO setup, real investor docs

---

## Related docs

- [`docs/PORTAL-DEPLOY.md`](./PORTAL-DEPLOY.md) — step-by-step to bring `app.digiteq.io` live
- [`docs/PRODUCTION.md`](./PRODUCTION.md) — Vercel, env vars, webhooks, portal DB
- [`docs/PHASE2.md`](./PHASE2.md) — Portal architecture and v1 scope
- [`AGENTS.md`](../AGENTS.md) — Repo conventions for agents and contributors
- [`INTEGRATION-GUIDE.md`](../INTEGRATION-GUIDE.md) — Marketing site integration reference
