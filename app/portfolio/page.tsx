import { PortfolioPageContent } from "@/components/pages/portfolio-page";
import { PageShell } from "@/components/layout/page-shell";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";
import { mapPortfolioCards } from "@/lib/portfolio/cards";
import { getSanityClient } from "@/lib/sanity/client";
import { PORTFOLIO_QUERY } from "@/lib/sanity/queries";
import type { Company } from "@/lib/sanity/types";

export const metadata = buildMetadata(pageMetadata.portfolio);

export default async function PortfolioPage() {
  let companies: Company[] = [];
  try {
    companies = await getSanityClient().fetch<Company[]>(PORTFOLIO_QUERY);
  } catch {
    companies = [];
  }

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Portfolio", href: "/portfolio" },
        ]}
      />
      <PortfolioPageContent companies={mapPortfolioCards(companies)} />
    </PageShell>
  );
}
