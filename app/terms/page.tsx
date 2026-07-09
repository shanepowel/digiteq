import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MarkdownDocument } from "@/components/legal/markdown-document";
import { PageShell } from "@/components/layout/page-shell";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";

export const metadata = buildMetadata(pageMetadata.terms);

function getLegalContent(filename: string) {
  const filePath = path.join(process.cwd(), "content/legal", filename);
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw).content;
}

export default function TermsPage() {
  const content = getLegalContent("terms-of-service.md");

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Terms of Service", href: "/terms" },
        ]}
      />
      <MarkdownDocument content={content} title={pageMetadata.terms.title} />
    </PageShell>
  );
}
