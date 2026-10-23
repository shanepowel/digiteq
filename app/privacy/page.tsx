import { MarkdownDocument } from "@/components/legal/markdown-document";
import { PageShell } from "@/components/layout/page-shell";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";
import { getLegalDocument } from "@/lib/legal/markdown";

export const metadata = buildMetadata(pageMetadata.privacy);

export default function PrivacyPage() {
  const { content, updatedLabel } = getLegalDocument("privacy-policy.md");

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy" },
        ]}
      />
      <MarkdownDocument
        content={content}
        title={pageMetadata.privacy.title}
        updatedLabel={updatedLabel}
      />
    </PageShell>
  );
}
