# Portal deploy — `app.digiteq.io`

One-time setup to bring the Phase 2 portal live. The marketing site (`digiteq.io`) is already on Vercel; the portal needs a **second Vercel project** plus a **Cloudflare DNS record**.

## Current status (checked via Vercel MCP)

| Item | Status |
|------|--------|
| Vercel project `digiteq` (marketing) | Deploys from `shanepowel/digiteq` → `digiteq.io` |
| Vercel project `digiteqapp` (portal) | **Must use `shanepowel/digiteq` + root `apps/portal`** (not a separate `digiteqapp` repo) |
| `app.digiteq.io` DNS | Resolves to Vercel |
| Neon DB `digiteq-portal` | Created — project `lucky-king-95684613` |
| Clerk env on portal | **Required** — `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY` |

## Fix Git connection (required for deploys after PR merge)

If `digiteqapp` was created from a standalone repo, it will **not** deploy portal code from the monorepo.

### Automated (recommended)

```bash
VERCEL_TOKEN=... node scripts/reconnect-portal-vercel.mjs
```

This updates project settings, disconnects `shanepowel/digiteqapp`, connects `shanepowel/digiteq`, and deploys `main` from `apps/portal`.

### Manual (Vercel dashboard)

In Vercel → **digiteqapp** → **Settings** → **Git**:

1. Connect repository **`shanepowel/digiteq`**
2. Set **Root Directory** to `apps/portal`
3. Set **Production Branch** to `main`
4. Install command: `npm install --legacy-peer-deps`
5. Build command: `npm run build` (runs `prisma db push` + Next build)
6. Click **Redeploy** on `main` after saving

Domain `app.digiteq.io` stays on this project — no DNS change needed.

## GitHub Actions deploy (alternative)

Workflow `.github/workflows/deploy-portal.yml` runs `scripts/reconnect-portal-vercel.mjs` on pushes to `main` that touch `apps/portal/`. The script:

1. Sets **Root Directory** to `apps/portal` on **digiteqapp**
2. Disconnects the stale `shanepowel/digiteqapp` Git link
3. Connects **`shanepowel/digiteq`**
4. Triggers a production deployment from `main`

Add one repository secret in GitHub → **Settings → Secrets → Actions**:

| Secret | Value |
|--------|-------|
| `VERCEL_TOKEN` | [Vercel account token](https://vercel.com/account/tokens) |

Or run locally:

```bash
VERCEL_TOKEN=... node scripts/reconnect-portal-vercel.mjs
```

After reconnecting, you can delete the orphan private repo **`shanepowel/digiteqapp`** on GitHub (created by Vercel's "New Project" flow). It is no longer used once **digiteqapp** points at the monorepo.

## Troubleshooting

**HTTP 500 / `MIDDLEWARE_INVOCATION_FAILED`:** Set both Clerk keys on the portal Vercel project, then redeploy:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

Also add `app.digiteq.io` under Clerk → Domains.

**Without Clerk keys:** the portal shows a public landing page (no auth). Login and protected routes need Clerk configured.

## 1. Create the Vercel portal project (≈2 min)

Open this import link (pre-fills repo + root directory):

**[Create digiteq-portal on Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshanepowel%2Fdigiteq&project-name=digiteq-portal&root-directory=apps%2Fportal&production-branch=main)**

Confirm:

- Root Directory: `apps/portal`
- Install: `npm install --legacy-peer-deps`
- Build: `npm run build`
- Framework: Next.js

Deploy from `main`.

## 2. Add environment variables (portal project)

In Vercel → **digiteqapp** → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Neon connection string (project `digiteq-portal` / `lucky-king-95684613`) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | From Clerk dashboard (app `app_3FdI5bXQm3FVFVq4PkHRjHrmBE4`) |
| `CLERK_SECRET_KEY` | From Clerk dashboard (same application) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/login` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/login` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `fr7gld8d` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_PORTAL_URL` | `https://app.digiteq.io` |
| `NEXT_PUBLIC_MARKETING_URL` | `https://digiteq.io` |
| `PORTAL_INBOUND_SECRET` | Generate a random secret (same on marketing project) |

Redeploy after setting env vars. The build runs `prisma db push` automatically when `DATABASE_URL` is set.

Optional: seed sample pipeline data once:

```bash
cd apps/portal
npm run db:seed
```

## 3. Add domain in Vercel

Portal project → **Settings → Domains** → add:

```
app.digiteq.io
```

## 4. Add DNS in Cloudflare

Cloudflare → **digiteq.io** → DNS → add:

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| CNAME | `app` | `cname.vercel-dns.com` | DNS only (grey cloud) |

## 5. Clerk

Linked Clerk application: **`app_3FdI5bXQm3FVFVq4PkHRjHrmBE4`**

In Clerk → **Domains**, add `app.digiteq.io`.

To pull keys into local `.env.local` from the CLI:

```bash
cd apps/portal
clerk auth login
clerk init --app app_3FdI5bXQm3FVFVq4PkHRjHrmBE4
clerk doctor
```

Copy the same keys to Vercel → **digiteqapp** → Environment Variables, then redeploy.

## 6. Marketing webhook (optional)

On the **marketing** Vercel project, set:

- `MARKETING_INVESTMENT_WEBHOOK_URL=https://app.digiteq.io/api/webhooks/investment-inbound`
- `PORTAL_INBOUND_SECRET` (same value as portal)

## Verify

```bash
curl -sI https://app.digiteq.io
# Expect HTTP 200 or 307 to /login
```

Database schema is already pushed and seeded on Neon (`lucky-king-95684613`).
