import { VenturesPageContent } from "@/components/pages/ventures-page";
import { PageShell } from "@/components/layout/page-shell";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";
import { getSanityClient } from "@/lib/sanity/client";
import { VENTURES_QUERY } from "@/lib/sanity/queries";
import type { Venture } from "@/lib/sanity/types";

export const metadata = buildMetadata(pageMetadata.ventures);

export default async function VenturesPage() {
  let ventures: Venture[] = [];
  try {
    ventures = await getSanityClient().fetch<Venture[]>(VENTURES_QUERY);
  } catch {
    ventures = [];
  }

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Ventures", href: "/ventures" },
        ]}
      />
      <VenturesPageContent ventures={ventures} />
    </PageShell>
  );
}
