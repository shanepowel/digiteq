import { notFound } from "next/navigation";
import { CaseStudyArticle } from "@/components/pages/case-study-article";
import { PageShell } from "@/components/layout/page-shell";
import { buildMetadata } from "@/components/seo/metadata";
import { getSanityClient } from "@/lib/sanity/client";
import { ALL_CASE_STUDY_SLUGS, CASE_STUDY_BY_SLUG } from "@/lib/sanity/queries";
import type { CaseStudy } from "@/lib/sanity/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const slugs = await getSanityClient().fetch<{ slug: string }[]>(ALL_CASE_STUDY_SLUGS);
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const caseStudy = await getSanityClient().fetch<CaseStudy | null>(CASE_STUDY_BY_SLUG, { slug });
    if (caseStudy) {
      return buildMetadata({
        title: caseStudy.title,
        description: caseStudy.challenge || caseStudy.solution || "",
        path: `/case-studies/${slug}`,
      });
    }
  } catch {
    // fall through
  }

  return { title: "Case Study" };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  let caseStudy: CaseStudy | null = null;
  try {
    caseStudy = await getSanityClient().fetch<CaseStudy | null>(CASE_STUDY_BY_SLUG, { slug });
  } catch {
    caseStudy = null;
  }

  if (!caseStudy) notFound();

  return (
    <PageShell>
      <CaseStudyArticle caseStudy={caseStudy} />
    </PageShell>
  );
}

