import { portfolioCompanies } from "@/lib/portfolio/companies";

export const pillars = [
  {
    title: "Build",
    desc: "We create digital products, brands, and platforms from scratch. Our portfolio companies start as ideas and ship as revenue-generating businesses.",
  },
  {
    title: "Acquire",
    desc: "We identify businesses with strong fundamentals and unrealised growth potential. We acquire them, apply operational discipline, and scale them within the group.",
  },
  {
    title: "Supply",
    desc: "We source enterprise hardware and infrastructure from authorised European distributors and supply it into Southern African markets. Full warranty, compliance documentation, in-region support.",
  },
  {
    title: "Invest",
    desc: "We deploy capital into technology opportunities in high-growth markets, starting with Southern Africa. Where we see a gap between demand and supply, we build or back the solution.",
  },
] as const;

export type PortfolioFallbackItem = {
  name: string;
  desc: string;
  badge: string;
  link: string;
  href: string;
  color: "cyan" | "violet" | "magenta" | "muted";
  vi: number;
};

const fallbackColors: PortfolioFallbackItem["color"][] = ["cyan", "violet", "magenta"];

export const portfolioFallback: PortfolioFallbackItem[] = portfolioCompanies.map((company, index) => ({
  name: company.name,
  desc: company.description,
  badge: company.badge,
  link: company.link,
  href: company.website,
  color: fallbackColors[index % fallbackColors.length],
  vi: index,
}));

export const insightsFallback = [
  {
    title: "Digital equity beats campaign dependency",
    excerpt: "Why ownership compounds where rented attention fades.",
    category: "Strategy",
    slug: "digital-equity-beats-campaign-dependency",
  },
  {
    title: "How holding companies should use CMS architecture",
    excerpt: "Structured content as an operating layer, not a marketing afterthought.",
    category: "Technology",
    slug: "cms-architecture-for-holding-companies",
  },
  {
    title: "What makes a digital asset acquirable",
    excerpt: "The signals we look for before a conversation starts.",
    category: "Acquisitions",
    slug: "what-makes-a-digital-asset-acquirable",
  },
];
