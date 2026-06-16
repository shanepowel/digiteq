export const navigation = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Ventures", href: "/ventures" },
  { label: "Insights", href: "/insights" },
  { label: "Investment", href: "/investment" },
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
    title: "A digital group built for compounding ownership.",
    body: "Digiteq is the holding company layer for digital brands, products and media properties. We create, acquire and scale assets that compound into lasting digital equity.",
  },
  portfolio: {
    title: "Companies we build and scale.",
    body: "The portfolio combines agency capability, marketplace products, media assets and acquisition opportunities into a single operating system.",
  },
  ventures: {
    title: "Venture formation without the theatre.",
    body: "Digiteq Ventures identifies useful digital business models, validates durable demand and builds or acquires the assets worth compounding.",
  },
  insights: {
    title: "Thinking in digital equity.",
    body: "Insights, case studies and operator notes on building, acquiring and scaling digital businesses.",
  },
  investment: {
    title: "Looking to sell your digital business?",
    body: "We partner with founders to unlock the next chapter. Fair process. Fast decisions. Aligned outcomes.",
  },
  contact: {
    title: "Start the right conversation.",
    body: "Partnerships, investment enquiries and founder conversations all route through our team.",
  },
} as const;

export const investmentCriteria = [
  "Profitable digital businesses",
  "Niche media and newsletter assets",
  "Productised service brands",
  "Marketplaces with organic demand",
  "Software utilities with durable search intent",
] as const;

export const pillars = [
  {
    title: "Create",
    body: "Launch owned brands and products where Digiteq can compound audience, capability and data.",
  },
  {
    title: "Acquire",
    body: "Partner with founders or buy profitable digital assets with a clear operational upside.",
  },
  {
    title: "Scale",
    body: "Apply shared growth, product, content and automation systems across the portfolio.",
  },
  {
    title: "Integrate",
    body: "Turn separate ventures into a coordinated group with unified intelligence.",
  },
] as const;
