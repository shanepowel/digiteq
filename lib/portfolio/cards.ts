import { portfolioFallback } from "@/lib/fallbacks/home";
import type { Company } from "@/lib/sanity/types";

export type PortfolioCompanyCard = {
  name: string;
  slug: string;
  description: string;
  category: string;
  website: string;
  gradient: [string, string];
};

const gradients: [string, string][] = [
  ["#00D4FF", "#8B5CF6"],
  ["#8B5CF6", "#D946EF"],
  ["#D946EF", "#FF2D7B"],
];

const companyMeta: Record<
  string,
  { category: string; website: string; description: string; oneLiner: string }
> = {
  konduit: {
    category: "Supply",
    website: "https://konduit.tech",
    oneLiner: "Enterprise technology supply for Southern Africa",
    description:
      "European-sourced hardware and infrastructure delivered to businesses across Southern Africa with full warranty and in-region support.",
  },
  bmkrs: {
    category: "Brand",
    website: "https://bmkrs.com",
    oneLiner: "A brand company run by builders",
    description:
      "Full-service brand development from naming through to digital presence, with a partner network for specialist execution.",
  },
  "freelance-near-me": {
    category: "Marketplace",
    website: "https://freelancenearme.com",
    oneLiner: "Local freelancers, found faster",
    description:
      "A marketplace connecting businesses with vetted local freelancers. Focused on making the hiring process faster and more transparent for both sides.",
  },
};

export function mapPortfolioCards(companies: Company[]): PortfolioCompanyCard[] {
  const featuredSlugs = ["konduit", "bmkrs", "freelance-near-me"];

  if (companies.length === 0) {
    return portfolioFallback.map((item, index) => {
      const key =
        item.name === "Konduit"
          ? "konduit"
          : item.name === "BMKRS"
            ? "bmkrs"
            : "freelance-near-me";
      const meta = companyMeta[key];

      return {
        name: item.name,
        slug: key,
        description: meta?.oneLiner ?? item.desc,
        category: item.badge,
        website: item.href,
        gradient: gradients[index % gradients.length],
      };
    });
  }

  return companies
    .filter((c) => featuredSlugs.includes(c.slug ?? ""))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    .map((company, index) => {
      const slug = company.slug ?? "";
      const meta = companyMeta[slug];

      return {
        name: company.name,
        slug,
        description: meta?.oneLiner ?? company.description ?? "",
        category: meta?.category ?? "Brand",
        website: meta?.website ?? company.website ?? "#",
        gradient: gradients[index % gradients.length],
      };
    });
}
