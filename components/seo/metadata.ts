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
      "Digiteq creates, acquires and scales digital brands, products and media properties to build lasting digital equity.",
    path: "/",
  },
  about: {
    title: "About",
    description:
      "Digiteq is the holding company layer for digital brands, products and media. We create, acquire, scale and integrate assets that compound into durable digital equity.",
    path: "/about",
  },
  portfolio: {
    title: "Portfolio",
    description:
      "The Digiteq portfolio combines agency capability, marketplace products, media assets and acquisition opportunities into a single operating group.",
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
      "Operator notes on building, acquiring and scaling digital businesses. Strategy, technology and acquisition thinking from the Digiteq team.",
    path: "/insights",
  },
  caseStudies: {
    title: "Case Studies",
    description:
      "Case studies from the Digiteq portfolio — operating work, product launches and growth systems applied across digital assets.",
    path: "/case-studies",
  },
  investment: {
    title: "Investment",
    description:
      "Looking to sell your digital business? Digiteq acquires profitable digital brands, media assets and online businesses. Fair process, fast decisions.",
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
} as const;
