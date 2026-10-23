import { MarkdownDocument } from "@/components/legal/markdown-document";
import { PageShell } from "@/components/layout/page-shell";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";
import { getLegalDocument } from "@/lib/legal/markdown";

export const metadata = buildMetadata(pageMetadata.terms);

export default function TermsPage() {
  const { content, updatedLabel } = getLegalDocument("terms-of-service.md");

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Terms of Service", href: "/terms" },
        ]}
      />
      <MarkdownDocument
        content={content}
        title={pageMetadata.terms.title}
        updatedLabel={updatedLabel}
      />
    </PageShell>
  );
}
