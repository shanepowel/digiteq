#!/usr/bin/env node

/**
 * Digiteq Holdings — Universal Company Update Script
 * 
 * Updates company registration details, addresses, and legal pages
 * across ALL Digiteq portfolio properties:
 * 
 *   - digiteq.io        (holding company)
 *   - bmkrs.co           (brand studio)
 *   - freelancenearme.co.uk (freelance marketplace)
 *   - three18media.com   (media property)
 *   - konduit.tech       (technology supply)
 * 
 * Usage:
 *   node update-all-properties.mjs --dir ./path/to/project --brand konduit
 *   node update-all-properties.mjs --dir ./bmkrs --brand bmkrs
 *   node update-all-properties.mjs --dir ./digiteq --brand digiteq
 *   node update-all-properties.mjs --dir ./freelancenearme --brand freelancenearme
 *   node update-all-properties.mjs --dir ./three18media --brand three18media
 * 
 * Or run against all projects at once:
 *   node update-all-properties.mjs --all --root ./sites
 * 
 * Safe to run multiple times (idempotent).
 */

import fs from "fs";
import path from "path";

// ─── Company Details (single source of truth) ─────────────────

const COMPANY = {
  legal: "Digiteq Holdings Limited",
  trading: "Digiteq",
  number: "03730207",
  jurisdiction: "England and Wales",
  address: {
    line1: "66 Paul Street",
    city: "London",
    postcode: "EC2A 4NA",
    country: "United Kingdom",
    countryCode: "GB",
    oneLine: "66 Paul Street, London, EC2A 4NA, United Kingdom",
  },
};

// ─── Brand Definitions ────────────────────────────────────────

const BRANDS = {
  digiteq: {
    name: "Digiteq",
    domain: "digiteq.io",
    tagline: "We build, acquire, supply, and invest in technology.",
    description: "A technology holding company registered in the UK. We build, acquire, supply, and invest in technology businesses.",
    type: "parent",
    email: "hello@digiteq.io",
    privacy_email: "privacy@digiteq.io",
    palette: { primary: "ledger green", accent: "brass gold" },
  },
  bmkrs: {
    name: "BMKRS",
    domain: "bmkrs.co",
    tagline: "A brand company run by builders.",
    description: "Brand development from naming through to digital presence. Strategy, identity, web, content.",
    type: "trading name",
    email: "hello@bmkrs.co",
    privacy_email: "privacy@bmkrs.co",
    palette: { primary: "chalk dark", accent: "snap-line" },
  },
  freelancenearme: {
    name: "FreelanceNearMe",
    domain: "freelancenearme.co.uk",
    tagline: "Local freelancers, found faster.",
    description: "A marketplace connecting businesses with vetted local freelancers.",
    type: "trading name",
    email: "hello@freelancenearme.co.uk",
    privacy_email: "privacy@freelancenearme.co.uk",
    palette: { primary: "tbd", accent: "tbd" },
  },
  three18media: {
    name: "Three18 Media",
    domain: "three18media.com",
    tagline: "Content that connects.",
    description: "A media property within the Digiteq Holdings portfolio.",
    type: "trading name",
    email: "hello@three18media.com",
    privacy_email: "privacy@three18media.com",
    palette: { primary: "tbd", accent: "tbd" },
  },
  konduit: {
    name: "Konduit",
    domain: "konduit.tech",
    tagline: "Technology delivered.",
    description: "Enterprise technology supply for Southern African markets.",
    type: "trading name",
    email: "hello@konduit.tech",
    privacy_email: "privacy@konduit.tech",
    palette: { primary: "navy", accent: "blue" },
  },
};

// ─── Parse CLI Args ───────────────────────────────────────────

const args = process.argv.slice(2);
let targetDir = null;
let brandKey = null;
let runAll = false;
let rootDir = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--dir" && args[i + 1]) targetDir = args[++i];
  if (args[i] === "--brand" && args[i + 1]) brandKey = args[++i];
  if (args[i] === "--all") runAll = true;
  if (args[i] === "--root" && args[i + 1]) rootDir = args[++i];
}

if (!runAll && (!targetDir || !brandKey)) {
  console.log(`
Usage:
  node update-all-properties.mjs --dir ./path/to/project --brand <brand>
  node update-all-properties.mjs --all --root ./sites

Brands: ${Object.keys(BRANDS).join(", ")}
  `);
  process.exit(0);
}

// ─── Core Functions ───────────────────────────────────────────

function legalFooter(brand) {
  if (brand.type === "parent") {
    return `${COMPANY.legal}. Registered in ${COMPANY.jurisdiction}. Company number ${COMPANY.number}. Registered office: ${COMPANY.address.oneLine}.`;
  }
  return `${brand.name} is a trading name of ${COMPANY.legal}. Registered in ${COMPANY.jurisdiction}. Company number ${COMPANY.number}. Registered office: ${COMPANY.address.oneLine}.`;
}

function findAndReplace(dir, replacements) {
  let count = 0;

  function walk(d) {
    if (!fs.existsSync(d)) return;
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) {
        if (["node_modules", ".next", ".git", "dist", ".vercel"].includes(entry.name)) continue;
        walk(full);
      } else if (/\.(tsx?|jsx?|mdx?|json|css|html)$/.test(entry.name)) {
        let content = fs.readFileSync(full, "utf-8");
        let changed = false;
        for (const [search, replace] of replacements) {
          if (typeof search === "string") {
            if (content.includes(search)) {
              content = content.replaceAll(search, replace);
              changed = true;
            }
          } else if (search.test(content)) {
            content = content.replace(search, replace);
            changed = true;
          }
        }
        if (changed) {
          fs.writeFileSync(full, content, "utf-8");
          console.log(`  DONE  ${path.relative(dir, full)}`);
          count++;
        }
      }
    }
  }

  walk(dir);
  return count;
}

// ─── Build Replacements ───────────────────────────────────────

function getReplacements(brand) {
  return [
    // Old company references
    ["Pile Test Ltd", COMPANY.legal],
    ["Pile Test Limited", COMPANY.legal],
    ["pile test ltd", COMPANY.legal],
    ["Pile Test", COMPANY.legal],

    // Old addresses (catch common variations)
    ["Windsor, UK", `${COMPANY.address.city}, ${COMPANY.address.countryCode}`],
    ["Windsor, United Kingdom", `${COMPANY.address.line1}, ${COMPANY.address.city}, ${COMPANY.address.postcode}`],
    ["Windsor, England", `${COMPANY.address.line1}, ${COMPANY.address.city}, ${COMPANY.address.postcode}`],

    // Ensure company number is present where legal name appears
    // (these are safe no-ops if already correct)
    ["Company number 03730207", `Company number ${COMPANY.number}`],
    ["company number 03730207", `company number ${COMPANY.number}`],
  ];
}

// ─── Generate Legal Pages ─────────────────────────────────────

function generatePrivacyPage(brand) {
  const isParent = brand.type === "parent";
  const entityIntro = isParent
    ? `${brand.name} is operated by ${COMPANY.legal}, a company registered in ${COMPANY.jurisdiction} (company number ${COMPANY.number}).`
    : `${brand.name} is a trading name of ${COMPANY.legal}, a company registered in ${COMPANY.jurisdiction} (company number ${COMPANY.number}).`;

  const dataCollected = brand.name === "FreelanceNearMe"
    ? `<ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Your name and email address</li>
          <li>Your location (city or region)</li>
          <li>Professional skills and experience</li>
          <li>Portfolio links or work samples</li>
          <li>Business name (for clients posting jobs)</li>
          <li>Payment and billing information (processed by our payment provider)</li>
        </ul>`
    : brand.name === "Konduit"
    ? `<ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Your name and company name</li>
          <li>Email address</li>
          <li>Phone or WhatsApp number</li>
          <li>Country of delivery</li>
          <li>Product requirements and any details you provide</li>
        </ul>`
    : brand.name === "Three18 Media"
    ? `<ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Your name and email address</li>
          <li>Any information you submit through contact forms</li>
          <li>Newsletter subscription preferences</li>
        </ul>`
    : `<ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Your name and company name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Project requirements and any details you provide</li>
        </ul>`;

  return `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ${brand.name} collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
      <h1 className="text-2xl font-bold tracking-tight">Privacy policy</h1>
      <p className="mt-2 text-sm text-gray-400">Last updated: [DATE]</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="text-lg font-semibold text-gray-800">Who we are</h2>
          <p className="mt-2">
            ${entityIntro} Our registered office is ${COMPANY.address.oneLine}.
          </p>
          <p className="mt-2">
            For the purposes of the UK General Data Protection Regulation (UK GDPR)
            and the Data Protection Act 2018, ${COMPANY.legal} is the data controller.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">What we collect</h2>
          <p className="mt-2">When you use ${brand.name}, we may collect:</p>
          ${dataCollected}
          <p className="mt-4">
            We also collect standard analytics data (pages visited, referral source,
            device type) through Plausible Analytics, which does not use cookies and
            does not collect personal data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">How we use it</h2>
          <p className="mt-2">
            We use your information to respond to enquiries, deliver our services,
            and improve the ${brand.name} experience. We do not sell your data. We do
            not use it for automated decision-making.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">Your rights</h2>
          <p className="mt-2">
            Under UK GDPR, you have the right to access, correct, delete, or port
            your personal data. You can also object to processing or withdraw
            consent. Contact us at ${brand.privacy_email} to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">Contact</h2>
          <p className="mt-2">For privacy enquiries:</p>
          <p className="mt-2">
            Data Protection<br />
            ${COMPANY.legal}<br />
            ${COMPANY.address.line1}<br />
            ${COMPANY.address.city}, ${COMPANY.address.postcode}<br />
            ${COMPANY.address.country}
          </p>
          <p className="mt-2">${brand.privacy_email}</p>
        </section>
      </div>
    </div>
  );
}
`;
}

function generateTermsPage(brand) {
  const isParent = brand.type === "parent";
  const entityIntro = isParent
    ? `${brand.name} is operated by ${COMPANY.legal}.`
    : `${brand.name} is a trading name of ${COMPANY.legal}.`;

  const serviceTerms = brand.name === "FreelanceNearMe"
    ? `
        <section>
          <h2 className="text-lg font-semibold text-gray-800">The platform</h2>
          <p className="mt-2">
            FreelanceNearMe is a marketplace that connects businesses with freelancers.
            We facilitate introductions and provide the platform. We are not a party to
            any agreement between a client and a freelancer and are not responsible for
            the quality, timing, or outcome of work performed.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">User accounts</h2>
          <p className="mt-2">
            You are responsible for maintaining the security of your account and for
            all activity under it. You must provide accurate information and keep it
            up to date. We may suspend or terminate accounts that violate these terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">Fees</h2>
          <p className="mt-2">
            Fees for using the platform are set out on the pricing page and may change
            with reasonable notice. All fees are exclusive of VAT unless stated otherwise.
          </p>
        </section>`
    : brand.name === "Konduit"
    ? `
        <section>
          <h2 className="text-lg font-semibold text-gray-800">Quotations</h2>
          <p className="mt-2">
            All quotations are valid for 14 days from the date of issue unless otherwise
            stated. Prices are quoted in USD unless otherwise agreed and are exclusive of
            import duties, taxes, and shipping costs unless explicitly included.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">Orders and payment</h2>
          <p className="mt-2">
            Orders are confirmed upon receipt of a signed purchase order or written
            acceptance. Payment terms are pro-forma for new customers. Credit terms may
            be offered to established customers at our discretion.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">Delivery</h2>
          <p className="mt-2">
            Delivery timelines are estimated and not guaranteed. Risk transfers to the
            buyer upon delivery to the agreed destination.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">Warranty</h2>
          <p className="mt-2">
            All products are supplied with the manufacturer's standard warranty. We
            assist with warranty claims but are not the warrantor.
          </p>
        </section>`
    : brand.name === "BMKRS"
    ? `
        <section>
          <h2 className="text-lg font-semibold text-gray-800">Services</h2>
          <p className="mt-2">
            We provide brand development, design, and digital services as agreed in
            individual project proposals or retainer agreements. The scope, deliverables,
            timeline, and fees for each engagement are defined in the relevant proposal
            or statement of work.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">Intellectual property</h2>
          <p className="mt-2">
            Upon full payment, all intellectual property rights in the final deliverables
            transfer to the client, unless otherwise agreed. We retain the right to
            showcase the work in our portfolio unless the client requests otherwise in
            writing.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">Payment</h2>
          <p className="mt-2">
            Payment terms are set out in each project proposal. Standard terms are 50%
            on commencement and 50% on delivery. Invoices are payable within 14 days
            of issue.
          </p>
        </section>`
    : `
        <section>
          <h2 className="text-lg font-semibold text-gray-800">Content</h2>
          <p className="mt-2">
            All content published on ${brand.domain} is owned by ${COMPANY.legal}
            unless otherwise attributed. You may not reproduce, distribute, or create
            derivative works from our content without written permission.
          </p>
        </section>`;

  return `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for ${brand.name} services.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
      <h1 className="text-2xl font-bold tracking-tight">Terms and conditions</h1>
      <p className="mt-2 text-sm text-gray-400">Last updated: [DATE]</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="text-lg font-semibold text-gray-800">Company information</h2>
          <p className="mt-2">
            ${entityIntro} Registered in ${COMPANY.jurisdiction} under company
            number ${COMPANY.number}. Registered office: ${COMPANY.address.oneLine}.
          </p>
        </section>
        ${serviceTerms}
        <section>
          <h2 className="text-lg font-semibold text-gray-800">Limitation of liability</h2>
          <p className="mt-2">
            Our liability is limited to the fees paid for the relevant service or the
            value of goods supplied. We are not liable for indirect, consequential, or
            incidental losses.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">Governing law</h2>
          <p className="mt-2">
            These terms are governed by the laws of England and Wales. Any disputes
            shall be subject to the exclusive jurisdiction of the courts of England
            and Wales.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">Contact</h2>
          <p className="mt-2">
            ${COMPANY.legal}<br />
            ${COMPANY.address.line1}<br />
            ${COMPANY.address.city}, ${COMPANY.address.postcode}<br />
            ${COMPANY.address.country}
          </p>
          <p className="mt-2">${brand.email}</p>
        </section>
      </div>
    </div>
  );
}
`;
}

function generateCookiePage(brand) {
  return `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How ${brand.name} uses cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
      <h1 className="text-2xl font-bold tracking-tight">Cookie policy</h1>
      <p className="mt-2 text-sm text-gray-400">Last updated: [DATE]</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="text-lg font-semibold text-gray-800">Our approach</h2>
          <p className="mt-2">
            ${brand.name} uses Plausible Analytics, a privacy-focused analytics tool
            that does not use cookies and does not collect personal data. We do not
            serve advertising and do not use tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">Essential cookies</h2>
          <p className="mt-2">
            We may use strictly necessary cookies for site functionality (such as
            form submission state and authentication). These do not track you and
            cannot be disabled without breaking core features.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800">Contact</h2>
          <p className="mt-2">
            Questions about cookies? Contact us at ${brand.privacy_email}.
          </p>
          <p className="mt-2">
            ${COMPANY.legal}<br />
            ${COMPANY.address.line1}<br />
            ${COMPANY.address.city}, ${COMPANY.address.postcode}<br />
            ${COMPANY.address.country}
          </p>
        </section>
      </div>
    </div>
  );
}
`;
}

// ─── Generate company-config.ts (shared across all properties) ─

function generateCompanyConfig() {
  return `/**
 * Digiteq Holdings Limited — Company Configuration
 * Shared across all portfolio properties.
 *
 * Company: ${COMPANY.legal}
 * Number:  ${COMPANY.number}
 * Address: ${COMPANY.address.oneLine}
 */

export const COMPANY = {
  name: "${COMPANY.legal}",
  tradingAs: "${COMPANY.trading}",
  number: "${COMPANY.number}",
  jurisdiction: "${COMPANY.jurisdiction}",
  address: {
    line1: "${COMPANY.address.line1}",
    city: "${COMPANY.address.city}",
    postcode: "${COMPANY.address.postcode}",
    country: "${COMPANY.address.country}",
    countryCode: "${COMPANY.address.countryCode}",
    formatted: "${COMPANY.address.oneLine}",
  },
} as const;

export const PORTFOLIO = {
  digiteq: {
    name: "Digiteq",
    domain: "digiteq.io",
    type: "parent" as const,
    description: "We build, acquire, supply, and invest in technology.",
  },
  bmkrs: {
    name: "BMKRS",
    domain: "bmkrs.co",
    type: "trading name" as const,
    description: "A brand company run by builders.",
  },
  konduit: {
    name: "Konduit",
    domain: "konduit.tech",
    type: "trading name" as const,
    description: "Enterprise technology supply for Southern Africa.",
  },
  freelancenearme: {
    name: "FreelanceNearMe",
    domain: "freelancenearme.co.uk",
    type: "trading name" as const,
    description: "Local freelancers, found faster.",
  },
  three18media: {
    name: "Three18 Media",
    domain: "three18media.com",
    type: "trading name" as const,
    description: "Content that connects.",
  },
} as const;

/**
 * Generate standard legal footer text for any Digiteq property.
 */
export function legalFooter(tradingName?: string) {
  const prefix = tradingName
    ? \`\${tradingName} is a trading name of \${COMPANY.name}.\`
    : \`\${COMPANY.name}.\`;

  return \`\${prefix} Registered in \${COMPANY.jurisdiction}. Company number \${COMPANY.number}. Registered office: \${COMPANY.address.formatted}.\`;
}

/**
 * Structured data for JSON-LD Organization schema.
 * Include on every property's root layout.
 */
export function organizationJsonLd(brand: keyof typeof PORTFOLIO) {
  const b = PORTFOLIO[brand];
  const isParent = b.type === "parent";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: b.name,
    url: \`https://\${b.domain}\`,
    description: b.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.line1,
      addressLocality: COMPANY.address.city,
      postalCode: COMPANY.address.postcode,
      addressCountry: COMPANY.address.countryCode,
    },
    ...(isParent
      ? {}
      : {
          parentOrganization: {
            "@type": "Organization",
            name: COMPANY.name,
            url: "https://digiteq.io",
          },
        }),
  };
}
`;
}

// ─── Generate footer snippet ──────────────────────────────────

function generateFooterSnippet(brand) {
  return `
<!-- ═══════════════════════════════════════════════════════════ -->
<!-- ${brand.name} — Footer Legal Line                          -->
<!-- Drop this into your footer component.                      -->
<!-- ═══════════════════════════════════════════════════════════ -->

<!-- React/JSX version -->
<p className="text-xs text-gray-400">
  ${legalFooter(brand)}
</p>

<!-- Plain HTML version -->
<p style="font-size: 12px; color: #94a3b8;">
  ${legalFooter(brand)}
</p>

<!-- JSON-LD (add to <head> or root layout) -->
<script type="application/ld+json">
${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  url: `https://${brand.domain}`,
  description: brand.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.address.line1,
    addressLocality: COMPANY.address.city,
    postalCode: COMPANY.address.postcode,
    addressCountry: COMPANY.address.countryCode,
  },
  ...(brand.type === "parent"
    ? {}
    : {
        parentOrganization: {
          "@type": "Organization",
          name: COMPANY.legal,
          url: "https://digiteq.io",
        },
      }),
}, null, 2)}
</script>
`;
}

// ─── Process a Single Brand ───────────────────────────────────

function processBrand(dir, key) {
  const brand = BRANDS[key];
  if (!brand) {
    console.error(`Unknown brand: ${key}. Options: ${Object.keys(BRANDS).join(", ")}`);
    return;
  }

  console.log(`\n${"═".repeat(50)}`);
  console.log(`  ${brand.name} (${brand.domain})`);
  console.log(`  Directory: ${dir}`);
  console.log(`${"═".repeat(50)}\n`);

  // 1. Find-and-replace across all source files
  console.log("  Scanning for company references...\n");
  const replacements = getReplacements(brand);
  const count = findAndReplace(dir, replacements);
  console.log(`\n  ${count} file(s) updated with company details.\n`);

  // 2. Write company-config.ts (src/lib or lib)
  const srcLibDir = path.join(dir, "src/lib");
  const rootLibDir = path.join(dir, "lib");
  if (fs.existsSync(path.join(dir, "src"))) {
    if (!fs.existsSync(srcLibDir)) fs.mkdirSync(srcLibDir, { recursive: true });
    fs.writeFileSync(path.join(srcLibDir, "company-config.ts"), generateCompanyConfig(), "utf-8");
    console.log("  NEW   src/lib/company-config.ts");
  } else if (fs.existsSync(rootLibDir) || fs.existsSync(path.join(dir, "app"))) {
    if (!fs.existsSync(rootLibDir)) fs.mkdirSync(rootLibDir, { recursive: true });
    fs.writeFileSync(path.join(rootLibDir, "company-config.ts"), generateCompanyConfig(), "utf-8");
    console.log("  NEW   lib/company-config.ts");
  }

  // 3. Write legal pages (src/app or app)
  const legalPages = [
    { segment: "privacy", file: "page.tsx", content: generatePrivacyPage(brand) },
    { segment: "terms", file: "page.tsx", content: generateTermsPage(brand) },
    { segment: "cookies", file: "page.tsx", content: generateCookiePage(brand) },
  ];

  const usesSrcAppRouter = fs.existsSync(path.join(dir, "src/app"));
  const usesRootAppRouter = fs.existsSync(path.join(dir, "app"));

  if (usesSrcAppRouter) {
    for (const page of legalPages) {
      const pageDir = path.join(dir, "src/app", page.segment);
      if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });
      fs.writeFileSync(path.join(pageDir, page.file), page.content, "utf-8");
      console.log(`  NEW   src/app/${page.segment}/${page.file}`);
    }
  } else if (usesRootAppRouter) {
    // Digiteq-style: keep markdown routes; only ensure cookies route exists if missing
    // Prefer not overwriting curated markdown-backed legal pages.
    console.log("  SKIP  React legal page overwrite (markdown legal pages detected under app/)");
  }

  // 4. Write footer snippet to a reference file
  const snippetPath = path.join(dir, "FOOTER_LEGAL.md");
  fs.writeFileSync(snippetPath, generateFooterSnippet(brand), "utf-8");
  console.log("  NEW   FOOTER_LEGAL.md (reference snippet)");

  console.log(`\n  Done: ${brand.name}\n`);
}

// ─── Execute ──────────────────────────────────────────────────

console.log(`
╔═══════════════════════════════════════════════════╗
║  Digiteq Holdings — Universal Company Update      ║
║                                                   ║
║  ${COMPANY.legal}                   ║
║  Company number: ${COMPANY.number}                    ║
║  ${COMPANY.address.oneLine}  ║
╚═══════════════════════════════════════════════════╝
`);

if (runAll) {
  const root = rootDir || process.cwd();
  const expected = {
    digiteq: ["digiteq", "digiteq.io", "digiteq-site"],
    bmkrs: ["bmkrs", "bmkrs.co", "bmkrs-site"],
    freelancenearme: ["freelancenearme", "freelance-near-me", "fnm"],
    three18media: ["three18media", "three18", "three18media-site"],
    konduit: ["konduit", "konduit.tech", "konduit-site"],
  };

  for (const [key, dirNames] of Object.entries(expected)) {
    let found = false;
    for (const dirName of dirNames) {
      const tryDir = path.join(root, dirName);
      if (fs.existsSync(tryDir)) {
        processBrand(tryDir, key);
        found = true;
        break;
      }
    }
    if (!found) {
      console.log(`  SKIP  ${key} — directory not found under ${root}`);
      console.log(`         (looked for: ${dirNames.join(", ")})\n`);
    }
  }
} else {
  processBrand(targetDir, brandKey);
}

// ─── Summary ──────────────────────────────────────────────────

console.log(`
${"═".repeat(50)}
  Next steps:

  1. File NM01 at Companies House
     £10 standard (5-8 days) / £30 same-day
     https://find-and-update.company-information.service.gov.uk

  2. Update HMRC, bank, and insurance once
     certificate of incorporation on change
     of name is issued

  3. Update SIC codes for technology supply
     (current codes may reflect Pile Test's
     original activity)

  4. Replace [DATE] placeholders in all
     legal pages across all properties

  5. Have legal review terms and privacy
     policy before go-live on any property

  6. Register for VAT if annual turnover
     exceeds the threshold

  7. Update Companies House with 66 Paul
     Street as the registered office (if
     not already filed)
${"═".repeat(50)}
`);
