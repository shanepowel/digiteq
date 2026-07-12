/**
 * Digiteq Holdings Limited — Company Configuration
 * Shared across all portfolio properties.
 *
 * Company: Digiteq Holdings Limited
 * Number:  03730207
 * Address: 66 Paul Street, London, EC2A 4NA, United Kingdom
 */

export const COMPANY = {
  name: "Digiteq Holdings Limited",
  tradingAs: "Digiteq",
  number: "03730207",
  jurisdiction: "England and Wales",
  address: {
    line1: "66 Paul Street",
    city: "London",
    postcode: "EC2A 4NA",
    country: "United Kingdom",
    countryCode: "GB",
    formatted: "66 Paul Street, London, EC2A 4NA, United Kingdom",
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
    ? `${tradingName} is a trading name of ${COMPANY.name}.`
    : `${COMPANY.name}.`;

  return `${prefix} Registered in ${COMPANY.jurisdiction}. Company number ${COMPANY.number}. Registered office: ${COMPANY.address.formatted}.`;
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
    url: `https://${b.domain}`,
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
