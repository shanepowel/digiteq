# digiteq.io improvement integration guide

this document explains how to integrate every deliverable into your existing next.js project. work through it sequentially. each section is independent so you can ship incrementally.

---

## file inventory

```
content/insights/
├── what-makes-a-digital-asset-acquirable.md      # full article (~1200 words)
├── cms-architecture-for-holding-companies.md      # full article (~1100 words)
└── digital-equity-beats-campaign-dependency.md    # full article (~1300 words)

content/legal/
├── privacy-policy.md                              # uk gdpr compliant
└── terms-of-service.md                            # covers site use and acquisition discussions

components/animation/
└── motion.tsx                                     # framer motion utilities (Reveal, Stagger, etc.)

components/seo/
├── json-ld.tsx                                    # structured data components
└── metadata.ts                                    # per-page metadata builder

components/pages/
├── about-page.tsx                                 # expanded about with operating model + principles
├── investment-page.tsx                            # redesigned with process timeline + qualification form
├── portfolio-page.tsx                             # with metrics, status badges, acquisition CTA card
├── insights-page.tsx                              # with category filtering tabs
└── insight-detail-page.tsx                        # article template with author, breadcrumbs, prose

globals-additions.css                              # prose styles, selection, scrollbar, focus rings
```

---

## 1. install dependencies

```bash
npm install framer-motion
```

framer-motion is the only new dependency. everything else uses your existing stack.

---

## 2. add animation utilities

copy `components/animation/motion.tsx` into your project at `components/animation/motion.tsx`.

this provides six components:
- `Reveal` — scroll-triggered fade-up on any element
- `Stagger` — container that staggers children on scroll entry
- `StaggerItem` — individual child inside a Stagger
- `WordReveal` — word-by-word text reveal for hero headlines
- `CountUp` — simple fade-up for metric values

usage:

```tsx
import { Reveal, Stagger, StaggerItem } from '@/components/animation/motion';

// single element
<Reveal>
  <h2>This fades up on scroll</h2>
</Reveal>

// staggered grid
<Stagger className="grid grid-cols-3 gap-5">
  <StaggerItem><Card>One</Card></StaggerItem>
  <StaggerItem><Card>Two</Card></StaggerItem>
  <StaggerItem><Card>Three</Card></StaggerItem>
</Stagger>
```

wrap every section heading and content block in `<Reveal>` for consistent scroll animation across the site. wrap every card grid in `<Stagger>` with `<StaggerItem>` per card.

**apply to the homepage too.** go through each section of your existing homepage and wrap the content in Reveal/Stagger. the hero headline, the ecosystem section, philosophy, portfolio grid, investment CTA, and footer should all animate on scroll.

---

## 3. add seo infrastructure

### metadata

copy `components/seo/metadata.ts` to your project. then update each page file:

```tsx
// app/about/page.tsx
import { buildMetadata, pageMetadata } from '@/components/seo/metadata';

export const metadata = buildMetadata(pageMetadata.about);
```

this gives every page a unique title, description, og image, and canonical URL. the current site uses the same meta-description on every page, which hurts seo. this fixes it.

### json-ld structured data

copy `components/seo/json-ld.tsx` to your project. add to layouts:

```tsx
// app/layout.tsx (or app/page.tsx for homepage only)
import { OrganizationJsonLd } from '@/components/seo/json-ld';

// inside the component:
<OrganizationJsonLd />
```

```tsx
// app/insights/[slug]/page.tsx
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld';

// inside the component:
<ArticleJsonLd title={...} description={...} slug={...} publishedAt={...} author={...} category={...} />
<BreadcrumbJsonLd items={[
  { name: 'Home', href: '/' },
  { name: 'Insights', href: '/insights' },
  { name: article.title, href: `/insights/${article.slug}` },
]} />
```

---

## 4. add insight article content

### option a: static (fastest)

install a markdown renderer:

```bash
npm install react-markdown
```

place the three .md files in `/content/insights/` in your project. import and render them in the insight detail page:

```tsx
import ReactMarkdown from 'react-markdown';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // npm install gray-matter

export default async function InsightPage({ params }) {
  const filePath = path.join(process.cwd(), 'content/insights', `${params.slug}.md`);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return (
    <article className="prose-digiteq max-w-[720px] mx-auto px-12">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
```

### option b: sanity (recommended for long-term)

import the markdown content into sanity as portable text blocks. use the sanity CLI or the studio's document editor. each article maps to an `insight` document type with the frontmatter fields as document fields.

then render with `@portabletext/react`:

```tsx
import { PortableText } from '@portabletext/react';

<div className="prose-digiteq">
  <PortableText value={article.content} />
</div>
```

---

## 5. replace page files

replace your existing page files with the new versions. the mapping:

| deliverable file | target location in your project |
|---|---|
| `components/pages/about-page.tsx` | `app/about/page.tsx` |
| `components/pages/investment-page.tsx` | `app/investment/page.tsx` |
| `components/pages/portfolio-page.tsx` | `app/portfolio/page.tsx` |
| `components/pages/insights-page.tsx` | `app/insights/page.tsx` |
| `components/pages/insight-detail-page.tsx` | `app/insights/[slug]/page.tsx` |

each file is a complete page component. review and adjust imports to match your project structure (particularly the animation and seo component paths).

the investment page has a qualification form with fields for business type, revenue range, years operating, traffic source, and reason for selling. wire the form submission to your hubspot route handler at `/api/investment`. create this route handler:

```tsx
// app/api/investment/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();

  // Forward to HubSpot Forms API
  const hubspotRes = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_INVESTMENT_FORM_ID}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: [
          { name: 'firstname', value: data.name },
          { name: 'email', value: data.email },
          { name: 'company', value: data.businessName },
          { name: 'website', value: data.businessUrl },
          { name: 'business_type', value: data.businessType },
          { name: 'revenue_range', value: data.revenueRange },
          { name: 'years_operating', value: data.yearsOperating },
          { name: 'traffic_source', value: data.trafficSource },
          { name: 'reason_for_sale', value: data.reason },
          { name: 'message', value: data.message },
        ],
        context: {
          pageUri: 'https://digiteq.io/investment',
          pageName: 'Investment Enquiry',
        },
      }),
    }
  );

  if (hubspotRes.ok) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
}
```

create the custom properties in hubspot first: business_type, revenue_range, years_operating, traffic_source, reason_for_sale. create a separate form and pipeline for investment enquiries.

---

## 6. add legal pages

create two new page routes:

```tsx
// app/privacy/page.tsx
import ReactMarkdown from 'react-markdown';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { buildMetadata, pageMetadata } from '@/components/seo/metadata';

export const metadata = buildMetadata(pageMetadata.privacy);

export default function PrivacyPage() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), 'content/legal/privacy-policy.md'), 'utf8'
  );
  const { content } = matter(raw);

  return (
    <section className="pt-32 pb-24 px-12">
      <div className="max-w-[720px] mx-auto prose-digiteq">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </section>
  );
}
```

do the same for `/app/terms/page.tsx` using `terms-of-service.md`.

then update the footer links:

```tsx
// In your footer component, change:
<Link href="/privacy">Privacy Policy</Link>
<Link href="/terms">Terms of Service</Link>
```

---

## 7. add global css additions

append the contents of `globals-additions.css` to your existing `styles/globals.css`. this adds:

- `.prose-digiteq` styles for article rendering
- `::selection` colour (cyan tint)
- `:focus-visible` ring (cyan, for accessibility)
- custom scrollbar (subtle, dark)
- reduced motion media query

---

## 8. fix social links

update your footer component:

```tsx
// Replace generic links with actual profiles
<a href="https://linkedin.com/company/digiteq" ...>
<a href="https://x.com/digiteqhq" ...>
<a href="mailto:hello@digiteq.io" ...>
```

create the linkedin company page and x profile if they do not exist yet.

---

## 9. fix placeholder content

in the footer, either set a real phone number or remove the phone line entirely:

```tsx
// Remove this if no phone number exists:
// <div><Phone /><span>+44 (0) 20 XXXX XXXX</span></div>
```

---

## 10. add sitemap

```bash
npm install next-sitemap
```

create `next-sitemap.config.js`:

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://digiteq.io',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/portfolio': 0.9,
      '/investment': 0.9,
      '/insights': 0.8,
      '/about': 0.7,
      '/contact': 0.6,
    };
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
```

add to `package.json` scripts:

```json
"postbuild": "next-sitemap"
```

this generates `/sitemap.xml` and `/robots.txt` on every build. update the footer sitemap link to point to `/sitemap.xml`.

---

## 11. verify integrations

after deploying all changes, verify:

- [ ] contact form submits to hubspot (check hubspot inbox)
- [ ] investment form submits to hubspot (separate pipeline)
- [ ] newsletter subscribe works (check resend or hubspot)
- [ ] plausible is tracking (check plausible dashboard)
- [ ] og images render correctly (test with opengraph.xyz)
- [ ] json-ld validates (test with google rich results test)
- [ ] sitemap.xml is accessible
- [ ] robots.txt is accessible
- [ ] all insight articles render body content
- [ ] all footer links resolve to real pages

---

## deployment order

ship in this order to minimise risk:

1. animation utilities + wrap existing sections (visual improvement, no content change)
2. metadata and json-ld (seo improvement, invisible to users)
3. globals.css additions (visual polish)
4. insight article content (critical credibility fix)
5. about page replacement (content expansion)
6. portfolio page replacement (metrics restoration)
7. insights page replacement (category filtering)
8. investment page replacement (biggest conversion improvement)
9. legal pages + footer link fixes (compliance)
10. sitemap + social links + placeholder removal (cleanup)

each step is independently deployable and testable.
