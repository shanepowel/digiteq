export const navigation = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Invest", href: "/investment" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export const contactTypes = [
  "Investment Enquiry",
  "Partnership Enquiry",
  "General Contact",
  "Newsletter",
] as const;

export const pageContent = {
  about: {
    title: "About Digiteq",
    body: "Digiteq is a technology holding company registered in the UK. We build, acquire, supply, and invest in technology businesses.",
  },
  portfolio: {
    title: "Portfolio",
    body: "Companies across brand development, marketplace platforms, and enterprise technology supply.",
  },
  ventures: {
    title: "Venture formation without the theatre.",
    body: "Digiteq Ventures identifies useful digital business models, validates durable demand and builds or acquires the assets worth compounding.",
  },
  insights: {
    title: "Thinking in technology investment.",
    body: "Insights on building, acquiring, supplying, and investing in technology businesses.",
  },
  investment: {
    title: "Invest with Digiteq",
    body: "We deploy capital into technology businesses and supply chains where the opportunity is clear and the competition is thin.",
  },
  contact: {
    title: "Start the right conversation.",
    body: "Partnerships, investment enquiries and founder conversations all route through our team.",
  },
} as const;

export const investmentCriteria = [
  "Digital businesses with proven revenue and operational inefficiency we can fix",
  "Technology supply chain businesses with existing customer relationships in African markets",
  "Complementary platforms that extend the Digiteq portfolio into adjacent verticals",
] as const;

export const pillars = [
  {
    title: "Build",
    body: "We create digital products, brands, and platforms from scratch.",
  },
  {
    title: "Acquire",
    body: "We identify businesses with strong fundamentals and unrealised growth potential.",
  },
  {
    title: "Supply",
    body: "We source enterprise hardware and infrastructure from authorised European distributors.",
  },
  {
    title: "Invest",
    body: "We deploy capital into technology opportunities in high-growth markets.",
  },
] as const;
