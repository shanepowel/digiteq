import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { Ecosystem } from "@/components/sections/ecosystem";
import { Hero } from "@/components/sections/hero";
import { InvestmentCta } from "@/components/sections/investment-cta";
import { Philosophy } from "@/components/sections/philosophy";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";
import { getSanityClient } from "@/lib/sanity/client";
import { PORTFOLIO_QUERY } from "@/lib/sanity/queries";
import type { Company } from "@/lib/sanity/types";

export const metadata = buildMetadata(pageMetadata.home);

export default async function HomePage() {
  let companies: Company[] = [];
  try {
    companies = await getSanityClient().fetch<Company[]>(PORTFOLIO_QUERY);
  } catch {
    companies = [];
  }

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ecosystem />
        <PortfolioGrid companies={companies} />
        <Philosophy />
        <InvestmentCta />
      </main>
      <Footer />
    </>
  );
}
