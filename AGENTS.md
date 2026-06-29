# AGENTS.md — Digiteq repo guide

Conventions for AI agents and contributors working in this monorepo.

---

## Repository layout

```
/                          # Marketing site (digiteq.io) — Next.js 15 App Router
  app/                     # Routes
  components/              # UI, pages, SEO, layout
  content/                 # Markdown insights + legal
  lib/                     # Sanity, HubSpot, Resend, utilities
  sanity/                  # CMS schemas, seeds, Studio config
  e2e/                     # Playwright smoke tests
  docs/                    # ROADMAP, PRODUCTION, PHASE2

apps/portal/               # Operating platform (app.digiteq.io)
  src/app/                 # Portal routes + API
  prisma/                  # Postgres schema + seed

apps/konduit/              # Enterprise tech supply (konduit.tech)
  src/app/                 # Konduit routes + API
  sanity/                  # Konduit CMS schemas
```

**Three deployable apps, one repo.** Marketing builds from root; portal builds from `apps/portal`; Konduit builds from `apps/konduit` (each a separate Vercel project).

---

## Stack

| Layer | Marketing | Portal | Konduit |
|-------|-----------|--------|---------|
| Framework | Next.js 15 | Next.js 15 | Next.js 15 |
| Styling | Tailwind 4 | Tailwind 4 | Tailwind 4 |
| CMS | Sanity 3 | Sanity (read-only) | Sanity 3 |
| Auth | — | Clerk | — |
| DB | — | Postgres (Neon) + Prisma | — |
| Forms | HubSpot + Resend | Webhook from marketing | HubSpot + Resend |
| Analytics | Plausible | — | Plausible |

Install with `npm install --legacy-peer-deps` (peer dep conflicts with Sanity/Next).

---

## Page patterns (marketing)

New inner pages should follow the **about/portfolio** pattern, not legacy `ContentPage`:

```tsx
import { PageShell } from "@/components/layout/page-shell";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";

export const metadata = buildMetadata(pageMetadata.about);

export default function Page() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[...]} />
      <YourPageContent />
    </PageShell>
  );
}
```

- Add entries to `components/seo/metadata.ts` → `pageMetadata`.
- Use `components/animation/motion.tsx` (`Reveal`, `Stagger`, `StaggerItem`) for scroll animation.
- Page content components live in `components/pages/`.

`ContentPage` (`components/content-page.tsx`) is legacy — do not use for new work.

---

## Sanity

- Project: `fr7gld8d`, dataset: `production`
- Schemas: `sanity/schemas/`
- Seeds: `sanity/seed/*.ndjson` — import with `npm run import:seeds`
- Studio: `/studio`
- On publish, prod uses webhook → `/api/revalidate` (requires `SANITY_REVALIDATE_SECRET`)

---

## Environment

- Marketing: [`.env.example`](./.env.example)
- Portal: [`apps/portal/.env.example`](./apps/portal/.env.example)
- Konduit: [`apps/konduit/.env.example`](./apps/konduit/.env.example)
- Production wiring: [`docs/PRODUCTION.md`](./docs/PRODUCTION.md)

Site renders with **static fallbacks** when Sanity is not configured (see `lib/fallbacks/`).

---

## Scripts

```bash
npm run dev              # Marketing localhost:3000
npm run build
npm run lint
npm run typecheck
npm run test:e2e         # Playwright smoke
npm run portal:dev       # Portal localhost:3001
npm run portal:build
npm run konduit:dev      # Konduit localhost:3002
npm run konduit:build
npm run import:seeds     # Sanity seed import
```

Portal DB (from `apps/portal`):

```bash
npm run db:push
npm run db:seed
```

---

## Testing & CI

- Smoke tests: `e2e/smoke.spec.ts`
- CI: `.github/workflows/e2e.yml` — build, start, Playwright on PR and `main`
- Do not add trivial unit tests unless they cover real integration behavior.

---

## What to work on

See **[`docs/ROADMAP.md`](./docs/ROADMAP.md)** for the tracked checklist. Priority order:

1. Production env + verification (ops)
2. Marketing gaps (case studies, hero polish)
3. Phase 2.1 depth (notes UI, HubSpot sync, SSO, LP data)

Phase 2 v1 scope boundaries are in [`docs/PHASE2.md`](./docs/PHASE2.md).

---

## Code style

- TypeScript strict; exhaustive `switch` with `never` in default case.
- Imports at top of file (no inline imports).
- Match existing naming and component structure; minimal diffs.
- Prisma: both sides of relations, `createdAt`/`updatedAt`, indexes on queried fields.

---

## Do not

- Commit secrets or `.env.local`
- Fabricate LP/investor performance metrics
- Expand portal scope without updating `docs/PHASE2.md` and `docs/ROADMAP.md`
- Use `ContentPage` for new marketing pages
