import type { Metadata } from "next";
import { brandAssets } from "@/lib/brand";
import { siteUrl } from "@/lib/site";

export function buildMetadata(page: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const fullTitle = `${page.title} | Digiteq`;
  const ogImage = page.ogImage || brandAssets.og;

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: fullTitle,
      description: page.description,
      url: `${siteUrl}${page.path}`,
      siteName: "Digiteq",
      images: [{ url: ogImage, width: 1200, height: 630, alt: page.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${siteUrl}${page.path}`,
    },
  };
}

export const pageMetadata = {
  home: {
    title: "Building Digital Equity",
    description:
      "Digiteq builds, acquires, supplies and invests in technology — operating Konduit, BMKRS and FreelanceNearMe with long-term ownership.",
    path: "/",
  },
  about: {
    title: "About",
    description:
      "Digiteq Holdings Limited is a UK technology holding company. Independent brands, shared capital, registered in England and Wales.",
    path: "/about",
  },
  portfolio: {
    title: "Portfolio",
    description:
      "Konduit, BMKRS and FreelanceNearMe — Digiteq portfolio companies across enterprise supply, brand, and marketplace.",
    path: "/portfolio",
  },
  ventures: {
    title: "Ventures",
    description:
      "Digiteq Ventures backs and builds the next generation of digital-first companies, from pre-seed through to scale.",
    path: "/ventures",
  },
  insights: {
    title: "Insights",
    description:
      "Operator notes on building, acquiring, supplying, and investing in technology businesses. Strategy, supply chains, and acquisition thinking from the Digiteq team.",
    path: "/insights",
  },
  caseStudies: {
    title: "Case Studies",
    description:
      "Case studies from the Digiteq portfolio: operating work, product launches and growth systems applied across technology businesses.",
    path: "/case-studies",
  },
  investment: {
    title: "Invest",
    description:
      "Invest with Digiteq. We deploy capital into technology businesses and supply chains where the opportunity is clear and the competition is thin.",
    path: "/investment",
  },
  contact: {
    title: "Contact",
    description:
      "Start a conversation with Digiteq about partnerships, investment enquiries or founder discussions.",
    path: "/contact",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "How Digiteq collects, uses and protects your data. Our privacy practices and your rights under UK GDPR.",
    path: "/privacy",
  },
  terms: {
    title: "Terms of Service",
    description:
      "Terms governing the use of digiteq.io, including intellectual property, content disclaimers and liability.",
    path: "/terms",
  },
  cookies: {
    title: "Cookie Policy",
    description:
      "How Digiteq uses cookies and similar technologies. We use Plausible Analytics and do not serve advertising cookies.",
    path: "/cookies",
  },
} as const;
