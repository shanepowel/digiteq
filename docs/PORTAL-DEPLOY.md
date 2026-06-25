# Portal deploy — `app.digiteq.io`

One-time setup to bring the Phase 2 portal live. The marketing site (`digiteq.io`) is already on Vercel; the portal needs a **second Vercel project** plus a **Cloudflare DNS record**.

## Current status (checked via Vercel MCP)

| Item | Status |
|------|--------|
| Vercel project `digiteq` (marketing) | Live — `digiteq.io` |
| Vercel project `digiteqapp` (portal) | Deployed — add `app.digiteq.io` in Domains if missing |
| `app.digiteq.io` DNS | Resolves to Vercel |
| Neon DB `digiteq-portal` | Created — project `lucky-king-95684613` |
| Clerk env on portal | **Required** — missing keys cause `MIDDLEWARE_INVOCATION_FAILED` / HTTP 500 |

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
