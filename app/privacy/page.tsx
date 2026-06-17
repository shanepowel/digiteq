import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MarkdownDocument } from "@/components/legal/markdown-document";
import { PageShell } from "@/components/layout/page-shell";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";

export const metadata = buildMetadata(pageMetadata.privacy);

function getLegalContent(filename: string) {
  const filePath = path.join(process.cwd(), "content/legal", filename);
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw).content;
}

export default function PrivacyPage() {
  const content = getLegalContent("privacy-policy.md");

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy" },
        ]}
      />
      <MarkdownDocument content={content} />
    </PageShell>
  );
}
