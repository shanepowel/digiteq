import type { WithContext, Organization } from "schema-dts";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Ecosystem } from "@/components/sections/ecosystem";
import { Philosophy } from "@/components/sections/philosophy";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { InvestmentCta } from "@/components/sections/investment-cta";
import { getSanityClient } from "@/lib/sanity/client";
import { PORTFOLIO_QUERY } from "@/lib/sanity/queries";
import type { Company } from "@/lib/sanity/types";

export default async function HomePage() {
  let companies: Company[] = [];
  try {
    companies = await getSanityClient().fetch<Company[]>(PORTFOLIO_QUERY);
  } catch {
    companies = [];
  }

  const schema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Digiteq",
    url: "https://digiteq.com",
    slogan: "Building Digital Equity",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav />
      <main>
        <Hero />
        <Ecosystem />
        <Philosophy />
        <PortfolioGrid companies={companies} />
        <InvestmentCta />
      </main>
      <Footer />
    </>
  );
}
