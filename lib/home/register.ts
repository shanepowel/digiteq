import type { Company } from "@/lib/sanity/types";

export type RegisterPosition = "Operating" | "Pre-seed" | "In evaluation";

export type RegisterTrend = "positive" | "flat" | "eval";

export type RegisterRow = {
  index: string;
  name: string;
  slug: string;
  category: string;
  figureLabel: string;
  figureValue: string;
  trend: RegisterTrend;
  position: RegisterPosition;
  href: string;
};

export const registerFallback: RegisterRow[] = [
  {
    index: "001",
    name: "BMKRS",
    slug: "bmkrs",
    category: "Performance marketing",
    figureLabel: "Revenue growth",
    figureValue: "+186% YoY",
    trend: "positive",
    position: "Operating",
    href: "/portfolio/bmkrs",
  },
  {
    index: "002",
    name: "FreelanceNearMe",
    slug: "freelance-near-me",
    category: "Marketplace",
    figureLabel: "GMV growth",
    figureValue: "+142%",
    trend: "positive",
    position: "Operating",
    href: "/portfolio/freelance-near-me",
  },
  {
    index: "003",
    name: "Future Venture",
    slug: "future-venture",
    category: "SaaS · stealth",
    figureLabel: "Team",
    figureValue: "07",
    trend: "flat",
    position: "Pre-seed",
    href: "/portfolio/future-venture",
  },
  {
    index: "004",
    name: "Media Brand",
    slug: "media-brand",
    category: "Digital media",
    figureLabel: "Monthly visitors",
    figureValue: "1.2M+",
    trend: "positive",
    position: "Operating",
    href: "/portfolio/media-brand",
  },
  {
    index: "005",
    name: "Acquisition",
    slug: "acquisition-pipeline",
    category: "Content · SaaS · marketplaces",
    figureLabel: "Criteria",
    figureValue: "Profitable",
    trend: "eval",
    position: "In evaluation",
    href: "/portfolio/acquisition-pipeline",
  },
];

export const REGISTER_SLUGS = registerFallback.map((row) => row.slug);

const fallbackBySlug = Object.fromEntries(registerFallback.map((row) => [row.slug, row]));

function inferTrend(value: string, trend?: string): RegisterTrend {
  if (trend === "positive" || trend === "flat" || trend === "eval") return trend;
  if (value.startsWith("+")) return "positive";
  if (/profitable/i.test(value)) return "eval";
  return "flat";
}

function inferPosition(position?: string): RegisterPosition {
  if (position === "Operating" || position === "Pre-seed" || position === "In evaluation") {
    return position;
  }
  return "Operating";
}

export function mapCompaniesToRegister(companies: Company[]): RegisterRow[] {
  if (companies.length === 0) return registerFallback;

  return companies.map((company, i) => {
    const slug = company.slug ?? "";
    const fallback = fallbackBySlug[slug];
    const keyFigure = company.keyFigure;
    const figureValue = keyFigure?.value ?? fallback?.figureValue ?? "—";
    const trend = inferTrend(figureValue, keyFigure?.trend);
    const position = inferPosition(company.position ?? fallback?.position);

    return {
      index: String(i + 1).padStart(3, "0"),
      name: company.name,
      slug,
      category:
        company.category ??
        company.services?.[0] ??
        fallback?.category ??
        "Digital",
      figureLabel: keyFigure?.label ?? fallback?.figureLabel ?? "Status",
      figureValue,
      trend,
      position,
      href: slug ? `/portfolio/${slug}` : fallback?.href ?? "/portfolio",
    };
  });
}

export function registerBalanceSummary(rows: RegisterRow[]): string {
  const operating = rows.filter((r) => r.position === "Operating").length;
  const evaluation = rows.filter((r) => r.position === "In evaluation").length;
  const operatingLabel = String(operating).padStart(2, "0");
  const evaluationLabel = String(evaluation).padStart(2, "0");
  return `${operatingLabel} operating · ${evaluationLabel} in evaluation · compounding`;
}
