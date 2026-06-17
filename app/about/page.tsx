import { AboutPageContent } from "@/components/pages/about-page";
import { PageShell } from "@/components/layout/page-shell";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";

export const metadata = buildMetadata(pageMetadata.about);

export default function AboutPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />
      <AboutPageContent />
    </PageShell>
  );
}
