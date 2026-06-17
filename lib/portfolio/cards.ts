import { portfolioFallback } from "@/lib/fallbacks/home";
import type { Company } from "@/lib/sanity/types";

export type PortfolioCompanyCard = {
  name: string;
  slug: string;
  description: string;
  status: string;
  type: string;
  metrics: { label: string; value: string; highlight?: boolean }[];
  gradient: [string, string];
};

const gradients: [string, string][] = [
  ["#00D4FF", "#8B5CF6"],
  ["#8B5CF6", "#D946EF"],
  ["#6B7280", "#4B5563"],
  ["#D946EF", "#FF2D7B"],
  ["#8B5CF6", "#00D4FF"],
];

const statuses = ["Active", "Active", "Stealth", "Active", "Pipeline"];
const types = ["Agency", "Marketplace", "SaaS", "Media", "Various"];

export function mapPortfolioCards(companies: Company[]): PortfolioCompanyCard[] {
  if (companies.length === 0) {
    return portfolioFallback.map((item, index) => ({
      name: item.name,
      slug: item.href.replace("/portfolio/", ""),
      description: item.desc,
      status: statuses[index] ?? "Active",
      type: types[index] ?? "Various",
      metrics: item.metrics.map(([label, value]) => ({
        label,
        value,
        highlight: value.startsWith("+"),
      })),
      gradient: gradients[index % gradients.length],
    }));
  }

  return companies.map((company, index) => ({
    name: company.name,
    slug: company.slug || company.name.toLowerCase().replace(/\s+/g, "-"),
    description: company.description || "",
    status: statuses[index % statuses.length],
    type: types[index % types.length],
    metrics:
      company.metrics?.slice(0, 3).map((metric) => ({
        label: metric.label,
        value: metric.value,
        highlight: metric.value.startsWith("+"),
      })) ?? [],
    gradient: gradients[index % gradients.length],
  }));
}
