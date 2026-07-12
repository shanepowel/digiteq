import { brandAssets } from "@/lib/brand";
import { COMPANY, organizationJsonLd, PORTFOLIO } from "@/lib/company-config";
import { contactEmail, siteUrl } from "@/lib/site";

export function OrganizationJsonLd() {
  const base = organizationJsonLd("digiteq");
  const data = {
    ...base,
    name: COMPANY.name,
    alternateName: COMPANY.tradingAs,
    logo: `${siteUrl}${brandAssets.icon}`,
    foundingDate: "2026",
    contactPoint: {
      "@type": "ContactPoint",
      email: contactEmail,
      contactType: "General enquiries",
    },
    sameAs: ["https://linkedin.com/company/digiteq", "https://x.com/digiteqhq"],
    owns: [
      { "@type": "Organization", name: PORTFOLIO.konduit.name, url: `https://${PORTFOLIO.konduit.domain}` },
      { "@type": "Organization", name: PORTFOLIO.bmkrs.name, url: `https://${PORTFOLIO.bmkrs.domain}` },
      {
        "@type": "Organization",
        name: PORTFOLIO.freelancenearme.name,
        url: `https://${PORTFOLIO.freelancenearme.domain}`,
      },
      {
        "@type": "Organization",
        name: PORTFOLIO.three18media.name,
        url: `https://${PORTFOLIO.three18media.domain}`,
      },
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
      name: COMPANY.name,
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
