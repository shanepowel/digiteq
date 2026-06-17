import { InvestmentPageContent } from "@/components/pages/investment-page";
import { PageShell } from "@/components/layout/page-shell";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";

export const metadata = buildMetadata(pageMetadata.investment);

export default function InvestmentPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Investment", href: "/investment" },
        ]}
      />
      <InvestmentPageContent />
    </PageShell>
  );
}
