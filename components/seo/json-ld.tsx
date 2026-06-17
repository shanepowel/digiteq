import { brandAssets } from "@/lib/brand";
import { contactEmail, siteUrl } from "@/lib/site";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Digiteq Holdings",
    alternateName: "Digiteq",
    url: siteUrl,
    logo: `${siteUrl}${brandAssets.icon}`,
    description:
      "Digiteq creates, acquires and scales digital brands, products and media properties to build lasting digital equity.",
    foundingDate: "2026",
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: contactEmail,
      contactType: "General enquiries",
    },
    sameAs: ["https://linkedin.com/company/digiteq", "https://x.com/digiteqhq"],
    owns: [
      { "@type": "Organization", name: "BMKRS", url: "https://bmkrs.com" },
      { "@type": "Organization", name: "FreelanceNearMe", url: "https://freelancenearme.com" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  author: string;
  category: string;
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  publishedAt,
  author,
  category,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${siteUrl}/insights/${slug}`,
    datePublished: publishedAt,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: "Digiteq Holdings",
      logo: { "@type": "ImageObject", url: `${siteUrl}${brandAssets.icon}` },
    },
    articleSection: category,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/insights/${slug}` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: { name: string; href: string }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
