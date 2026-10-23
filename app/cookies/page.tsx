import { MarkdownDocument } from "@/components/legal/markdown-document";
import { PageShell } from "@/components/layout/page-shell";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";
import { getLegalDocument } from "@/lib/legal/markdown";

export const metadata = buildMetadata(pageMetadata.cookies);

export default function CookiesPage() {
  const { content, updatedLabel } = getLegalDocument("cookie-policy.md");

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Cookie Policy", href: "/cookies" },
        ]}
      />
      <MarkdownDocument
        content={content}
        title={pageMetadata.cookies.title}
        updatedLabel={updatedLabel}
      />
    </PageShell>
  );
}
