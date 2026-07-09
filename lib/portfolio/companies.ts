export const PORTFOLIO_SLUGS = ["konduit", "bmkrs", "freelance-near-me"] as const;

export type PortfolioSlug = (typeof PORTFOLIO_SLUGS)[number];

/** Legacy Sanity document IDs removed on seed import (pre-copy-update portfolio). */
export const LEGACY_COMPANY_IDS = [
  "company-future-venture",
  "company-media-brand",
  "company-acquisition-pipeline",
] as const;

export type PortfolioCompanyMeta = {
  name: string;
  slug: PortfolioSlug;
  category: string;
  badge: string;
  website: string;
  link: string;
  oneLiner: string;
  description: string;
};

export const portfolioCompanies: PortfolioCompanyMeta[] = [
  {
    name: "Konduit",
    slug: "konduit",
    category: "Supply",
    badge: "Supply",
    website: "https://konduit.tech",
    link: "konduit.tech",
    oneLiner: "Enterprise technology supply for Southern Africa",
    description:
      "European-sourced hardware and infrastructure delivered to businesses across Southern Africa with full warranty and in-region support.",
  },
  {
    name: "BMKRS",
    slug: "bmkrs",
    category: "Brand",
    badge: "Brand studio",
    website: "https://bmkrs.com",
    link: "bmkrs.com",
    oneLiner: "A brand company run by builders",
    description:
      "Full-service brand development from naming through to digital presence, with a partner network for specialist execution.",
  },
  {
    name: "FreelanceNearMe",
    slug: "freelance-near-me",
    category: "Marketplace",
    badge: "Marketplace",
    website: "https://freelancenearme.com",
    link: "freelancenearme.com",
    oneLiner: "Local freelancers, found faster",
    description:
      "A marketplace connecting businesses with vetted local freelancers. Focused on making the hiring process faster and more transparent for both sides.",
  },
];

export const portfolioCompanyBySlug = Object.fromEntries(
  portfolioCompanies.map((company) => [company.slug, company]),
) as Record<PortfolioSlug, PortfolioCompanyMeta>;

export function isPortfolioSlug(slug: string): slug is PortfolioSlug {
  return (PORTFOLIO_SLUGS as readonly string[]).includes(slug);
}
