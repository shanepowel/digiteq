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

export const portfolioFallback: PortfolioFallbackItem[] = [
  {
    name: "Konduit",
    desc: "European-sourced hardware and infrastructure delivered to businesses across Southern Africa with full warranty and in-region support.",
    badge: "Supply",
    link: "konduit.tech",
    href: "https://konduit.tech",
    color: "cyan",
    vi: 0,
  },
  {
    name: "BMKRS",
    desc: "A brand company run by builders. Full-service brand development from naming through to digital presence.",
    badge: "Brand studio",
    link: "bmkrs.com",
    href: "https://bmkrs.com",
    color: "violet",
    vi: 1,
  },
  {
    name: "FreelanceNearMe",
    desc: "A marketplace connecting businesses with vetted local freelancers. Faster, more transparent hiring for both sides.",
    badge: "Marketplace",
    link: "freelancenearme.com",
    href: "https://freelancenearme.com",
    color: "magenta",
    vi: 2,
  },
];

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
