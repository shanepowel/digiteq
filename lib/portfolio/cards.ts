import { portfolioCompanies } from "@/lib/portfolio/companies";
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

export function mapPortfolioCards(companies: Company[]): PortfolioCompanyCard[] {
  if (companies.length === 0) {
    return portfolioCompanies.map((company, index) => ({
      name: company.name,
      slug: company.slug,
      description: company.oneLiner,
      category: company.category,
      website: company.website,
      gradient: gradients[index % gradients.length],
    }));
  }

  return companies.map((company, index) => {
    const slug = company.slug ?? "";
    const meta = portfolioCompanies.find((item) => item.slug === slug);

    return {
      name: company.name,
      slug,
      description: meta?.oneLiner ?? company.description ?? "",
      category: company.category ?? meta?.category ?? "Brand",
      website: company.website ?? meta?.website ?? "#",
      gradient: gradients[index % gradients.length],
    };
  });
}
