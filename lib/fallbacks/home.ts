export const ecoCards = [
  {
    name: "BMKRS",
    desc: "Data-driven performance marketing and lead generation at scale.",
    link: "Visit BMKRS",
    href: "https://bmkrs.com",
    color: "cyan" as const,
  },
  {
    name: "FreelanceNearMe",
    desc: "Connecting businesses with freelance talent across industries.",
    link: "Visit FreelanceNearMe",
    href: "https://freelancenearme.com",
    color: "violet" as const,
  },
  {
    name: "Digiteq Ventures",
    desc: "Backing and building the next generation of digital-first companies.",
    link: "Explore Ventures",
    href: "/ventures",
    color: "magenta" as const,
  },
];

export type PortfolioFallbackItem = {
  name: string;
  desc: string;
  metrics: [string, string][];
  link: string;
  href: string;
  color: "cyan" | "violet" | "magenta" | "muted";
  vi: number;
  highlight: boolean;
};

export const portfolioFallback: PortfolioFallbackItem[] = [
  {
    name: "BMKRS",
    desc: "Performance marketing engine driving qualified leads and growth.",
    metrics: [["Revenue Growth", "+186%"], ["YoY", "3.2x"], ["Markets", "4"]],
    link: "View Company",
    href: "/portfolio/bmkrs",
    color: "cyan",
    vi: 0,
    highlight: true,
  },
  {
    name: "FreelanceNearMe",
    desc: "Marketplace connecting businesses with vetted freelance talent.",
    metrics: [["GMV Growth", "+142%"], ["Freelancers", "18K+"], ["Clients", "8K+"]],
    link: "View Company",
    href: "/portfolio/freelance-near-me",
    color: "violet",
    vi: 1,
    highlight: true,
  },
  {
    name: "Future Venture",
    desc: "Incubating a next-gen SaaS platform in stealth.",
    metrics: [["Stage", "Pre-Seed"], ["Team", "7"], ["Launch", "Soon"]],
    link: "Learn More",
    href: "/portfolio/future-venture",
    color: "muted",
    vi: 2,
    highlight: false,
  },
  {
    name: "Media Brand",
    desc: "Digital media property reaching high-intent audiences.",
    metrics: [["Monthly Visitors", "1.2M+"], ["Engagement", "3:48"], ["DR", "78"]],
    link: "View Company",
    href: "/portfolio/media-brand",
    color: "magenta",
    vi: 1,
    highlight: true,
  },
  {
    name: "Acquisition",
    desc: "Actively evaluating acquisitions in attractive niches.",
    metrics: [["Criteria", "Profitable"], ["", "Content, SaaS,"], ["Focus", "Marketplaces"]],
    link: "Learn More",
    href: "/portfolio/acquisition-pipeline",
    color: "violet",
    vi: 2,
    highlight: false,
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
