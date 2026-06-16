# Digiteq.io

Marketing site for Digiteq at [digiteq.io](https://digiteq.io) — a digital holding company platform.

## Stack

- Next.js 15 (App Router)
- Tailwind CSS 4
- Sanity CMS 3
- HubSpot + Resend integrations
- Plausible analytics

## Development

```bash
npm install --legacy-peer-deps
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio).

## Sanity

Project: **fr7gld8d** · dataset: **production**

```bash
# optional: recreate project with clean template
npm create sanity@latest -- --project fr7gld8d --dataset production --template clean

cp .env.example .env.local
npx sanity login
npm run import:seeds
```

Studio: [http://localhost:3000/studio](http://localhost:3000/studio) · manage at [sanity.io/manage/project/fr7gld8d](https://sanity.io/manage/project/fr7gld8d)

## Sanity seed import

Seed files live in `sanity/seed/` and mirror the homepage fallback content (5 portfolio companies, 3 ventures, 3 insights, 1 team member).

```bash
# 1. Set project id in .env.local
cp .env.example .env.local

# 2. Authenticate (once)
npx sanity login

# 3. Import seeds (default dataset: production)
npm run import:seeds

# Or target a dev dataset
npm run import:seeds -- development
```

Re-generate seed files after editing `scripts/generate-sanity-seeds.js`:

```bash
npm run generate:seeds
npm run import:seeds
```

Import order: team members → companies → ventures → insights (references team members).

After import, configure a Sanity webhook to `POST /api/revalidate` on publish.

## Environment

See `.env.example` for required variables. The site renders with static fallback content when Sanity credentials are not configured.

## Build

```bash
npm run build
npm start
```

## Deployment

1. Connect repo to Vercel
2. Set environment variables from `.env.example`
3. Configure Sanity webhook → `https://digiteq.io/api/revalidate` with `SANITY_REVALIDATE_SECRET`
4. Point domain **digiteq.io** at Vercel; set `NEXT_PUBLIC_SITE_URL=https://digiteq.io`
