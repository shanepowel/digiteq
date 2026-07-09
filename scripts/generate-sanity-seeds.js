/**
 * Regenerates sanity/seed/*.ndjson from lib/fallbacks/home.ts and data/site.ts.
 * Run: node scripts/generate-sanity-seeds.js
 */
const fs = require("fs");
const path = require("path");

const seedDir = path.join(__dirname, "..", "sanity", "seed");

const teamMembers = [
  {
    _id: "teamMember-shane-powell",
    _type: "teamMember",
    name: "Shane Powell",
    role: "Founder",
    bio: "Building Digiteq as the holding company layer for digital brands, products and media properties.",
  },
];

const companies = [
  {
    _id: "company-bmkrs",
    _type: "company",
    name: "BMKRS",
    slug: { _type: "slug", current: "bmkrs" },
    website: "https://bmkrs.com",
    description: "Performance marketing engine driving qualified leads and growth.",
    category: "Performance marketing",
    position: "Operating",
    keyFigure: { label: "Revenue growth", value: "+186% YoY", trend: "positive" },
    services: ["Performance marketing", "Lead generation", "Brand growth"],
    featured: true,
    order: 1,
    metrics: [
      { _key: "m1", label: "Status", value: "Active" },
      { _key: "m2", label: "Model", value: "Services" },
      { _key: "m3", label: "Revenue", value: "Project" },
    ],
  },
  {
    _id: "company-freelance-near-me",
    _type: "company",
    name: "FreelanceNearMe",
    slug: { _type: "slug", current: "freelance-near-me" },
    website: "https://freelancenearme.com",
    description: "Marketplace connecting businesses with vetted freelance talent.",
    category: "Marketplace",
    position: "Operating",
    keyFigure: { label: "GMV growth", value: "+142%", trend: "positive" },
    services: ["Marketplace", "Talent matching", "Local discovery"],
    featured: true,
    order: 2,
    metrics: [
      { _key: "m1", label: "Status", value: "Active" },
      { _key: "m2", label: "Model", value: "Marketplace" },
      { _key: "m3", label: "Revenue", value: "Transaction" },
    ],
  },
  {
    _id: "company-future-venture",
    _type: "company",
    name: "Future Venture",
    slug: { _type: "slug", current: "future-venture" },
    description: "Incubating a next-gen SaaS platform in stealth.",
    category: "SaaS · stealth",
    position: "Pre-seed",
    keyFigure: { label: "Team", value: "07", trend: "flat" },
    services: ["SaaS", "Product incubation"],
    featured: true,
    order: 3,
    metrics: [
      { _key: "m1", label: "Stage", value: "Pre-Seed" },
      { _key: "m2", label: "Team", value: "7" },
      { _key: "m3", label: "Launch", value: "Soon" },
    ],
  },
  {
    _id: "company-media-brand",
    _type: "company",
    name: "Media Brand",
    slug: { _type: "slug", current: "media-brand" },
    description: "Digital media property reaching high-intent audiences.",
    category: "Digital media",
    position: "Operating",
    keyFigure: { label: "Monthly visitors", value: "1.2M+", trend: "positive" },
    services: ["Digital media", "Audience development", "Content"],
    featured: true,
    order: 4,
    metrics: [
      { _key: "m1", label: "Monthly Visitors", value: "1.2M+" },
      { _key: "m2", label: "Engagement", value: "3:48" },
      { _key: "m3", label: "DR", value: "78" },
    ],
  },
  {
    _id: "company-acquisition-pipeline",
    _type: "company",
    name: "Acquisition",
    slug: { _type: "slug", current: "acquisition-pipeline" },
    description: "Actively evaluating acquisitions in attractive niches.",
    category: "Content · SaaS · marketplaces",
    position: "In evaluation",
    keyFigure: { label: "Criteria", value: "Profitable", trend: "eval" },
    services: ["Acquisitions", "Due diligence"],
    featured: true,
    order: 5,
    metrics: [
      { _key: "m1", label: "Criteria", value: "Profitable" },
      { _key: "m2", label: "Focus", value: "Marketplaces" },
      { _key: "m3", label: "Status", value: "Pipeline" },
    ],
  },
];

const ventures = [
  {
    _id: "venture-digiteq-ventures",
    _type: "venture",
    name: "Digiteq Ventures",
    stage: "Growth",
    industry: "Digital investments",
    url: "https://digiteq.io/ventures",
    description: "Backing and building the next generation of digital-first companies.",
    status: "Active",
  },
  {
    _id: "venture-future-saas",
    _type: "venture",
    name: "Future Venture",
    stage: "Pre-Seed",
    industry: "SaaS",
    description: "Incubating a next-gen SaaS platform in stealth.",
    status: "Stealth",
  },
  {
    _id: "venture-media-brand",
    _type: "venture",
    name: "Media Brand",
    stage: "Seed",
    industry: "Digital media",
    description: "Digital media property reaching high-intent audiences.",
    status: "Active",
  },
];

function block(text) {
  return [
    {
      _key: "b1",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ _key: "s1", _type: "span", marks: [], text }],
    },
  ];
}

const insights = [
  {
    _id: "insight-digital-equity",
    _type: "insight",
    title: "Digital equity beats campaign dependency",
    slug: { _type: "slug", current: "digital-equity-beats-campaign-dependency" },
    excerpt: "Why ownership compounds where rented attention fades.",
    category: "Strategy",
    publishedAt: "2026-05-01T09:00:00.000Z",
    author: { _type: "reference", _ref: "teamMember-shane-powell" },
    seo: {
      title: "Digital equity beats campaign dependency",
      description: "Why ownership compounds where rented attention fades.",
    },
    content: block(
      "Most teams optimise for campaign cycles. Digiteq optimises for owned assets that compound: brands, products, media and audiences that retain value after spend stops.",
    ),
  },
  {
    _id: "insight-cms-architecture",
    _type: "insight",
    title: "How holding companies should use CMS architecture",
    slug: { _type: "slug", current: "cms-architecture-for-holding-companies" },
    excerpt: "Structured content as an operating layer, not a marketing afterthought.",
    category: "Technology",
    publishedAt: "2026-05-08T09:00:00.000Z",
    author: { _type: "reference", _ref: "teamMember-shane-powell" },
    seo: {
      title: "How holding companies should use CMS architecture",
      description: "Structured content as an operating layer, not a marketing afterthought.",
    },
    content: block(
      "A holding company site is not a brochure. It is the schema for portfolio companies, ventures, insights and acquisition criteria. Build the CMS first and the platform follows.",
    ),
  },
  {
    _id: "insight-acquirable-assets",
    _type: "insight",
    title: "What makes a digital asset acquirable",
    slug: { _type: "slug", current: "what-makes-a-digital-asset-acquirable" },
    excerpt: "The signals we look for before a conversation starts.",
    category: "Acquisitions",
    publishedAt: "2026-05-15T09:00:00.000Z",
    author: { _type: "reference", _ref: "teamMember-shane-powell" },
    seo: {
      title: "What makes a digital asset acquirable",
      description: "The signals we look for before a conversation starts.",
    },
    content: block(
      "Profitable niches, durable search intent, clean data and operational upside. We move quickly when the fundamentals are clear and the founder wants a fair process.",
    ),
  },
];

function writeNdjson(filename, docs) {
  const content = docs.map((doc) => JSON.stringify(doc)).join("\n") + "\n";
  fs.writeFileSync(path.join(seedDir, filename), content);
  console.log(`wrote ${filename} (${docs.length} documents)`);
}

fs.mkdirSync(seedDir, { recursive: true });
writeNdjson("team-members.ndjson", teamMembers);
writeNdjson("companies.ndjson", companies);
writeNdjson("ventures.ndjson", ventures);
writeNdjson("insights.ndjson", insights);

console.log("Seed files generated in sanity/seed/");
