import { CaseStudiesPage, type CaseStudyListItem } from "@/components/pages/case-studies-page";
import { PageShell } from "@/components/layout/page-shell";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";
import { getSanityClient } from "@/lib/sanity/client";
import { CASE_STUDIES_QUERY } from "@/lib/sanity/queries";
import type { CaseStudy } from "@/lib/sanity/types";

export const metadata = buildMetadata(pageMetadata.caseStudies);

function mapCaseStudy(item: CaseStudy): CaseStudyListItem {
  return {
    slug: item.slug,
    title: item.title,
    challenge: item.challenge,
    solution: item.solution,
    featuredImage: item.featuredImage,
    clientName: item.client?.name,
  };
}

export default async function CaseStudiesIndexPage() {
  let items: CaseStudyListItem[] = [];

  try {
    const caseStudies = await getSanityClient().fetch<CaseStudy[]>(CASE_STUDIES_QUERY);
    items = caseStudies.map(mapCaseStudy);
  } catch {
    items = [];
  }

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies" },
        ]}
      />
      <CaseStudiesPage items={items} />
    </PageShell>
  );
}

