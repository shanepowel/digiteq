import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { DhCard, DhPageHero, DhSection } from "@/components/layout/dh-primitives";
import { PageShell } from "@/components/layout/page-shell";
import { REGISTER_SLUGS, registerFallback } from "@/lib/home/register";
import { isPortfolioSlug, portfolioCompanyBySlug } from "@/lib/portfolio/companies";
import { getSanityClient } from "@/lib/sanity/client";
import { ALL_COMPANY_SLUGS, COMPANY_BY_SLUG } from "@/lib/sanity/queries";
import type { Company } from "@/lib/sanity/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const company = await getSanityClient().fetch<Company | null>(COMPANY_BY_SLUG, { slug });
    if (company) return { title: company.name };
  } catch {
    // fall through
  }
  const fallback = registerFallback.find((item) => item.slug === slug) ??
    (isPortfolioSlug(slug) ? { name: portfolioCompanyBySlug[slug].name } : undefined);
  return { title: fallback?.name || "Company" };
}

export async function generateStaticParams() {
  const slugSet = new Set<string>(REGISTER_SLUGS);

  try {
    const slugs = await getSanityClient().fetch<{ slug: string }[]>(ALL_COMPANY_SLUGS);
    slugs.forEach(({ slug }) => slugSet.add(slug));
  } catch {
    // Sanity not configured
  }

  return [...slugSet].map((slug) => ({ slug }));
}

function isRegisterSlug(slug: string): boolean {
  return REGISTER_SLUGS.includes(slug);
}

async function getCompany(slug: string): Promise<Company | null> {
  if (!isRegisterSlug(slug)) return null;

  try {
    const company = await getSanityClient().fetch<Company | null>(COMPANY_BY_SLUG, { slug });
    if (company) return company;
  } catch {
    // Sanity not configured
  }

  const row = registerFallback.find((item) => item.slug === slug);
  if (!row) {
    const portfolioMeta = isPortfolioSlug(slug) ? portfolioCompanyBySlug[slug] : undefined;
    if (!portfolioMeta) return null;
    return {
      _id: `fallback-${slug}`,
      name: portfolioMeta.name,
      slug,
      description: portfolioMeta.description,
      website: portfolioMeta.website,
      category: portfolioMeta.category,
    };
  }

  return {
    _id: `fallback-${slug}`,
    name: row.name,
    slug,
    description: row.category,
    category: row.category,
    position: row.position,
    keyFigure: { label: row.figureLabel, value: row.figureValue, trend: row.trend },
  };
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const company = await getCompany(slug);

  if (!company) notFound();

  return (
    <PageShell>
      <DhPageHero eyebrow="Portfolio" title={company.name} titleClassName="max-w-[20ch]" />

      <DhSection className="!pt-0">
        <div className="max-w-[720px]">
          {company.category ? (
            <p className="dh-mono mb-6 !text-[var(--brass)]">{company.category}</p>
          ) : null}
          {company.description && (
            <p className="text-lg leading-relaxed text-[var(--ink-dim)]">{company.description}</p>
          )}
          {company.services && company.services.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {company.services.map((s) => (
                <span key={s} className="dh-badge">
                  {s}
                </span>
              ))}
            </div>
          )}
          {company.metrics && company.metrics.length > 0 && (
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {company.metrics.map((m) => (
                <DhCard key={m.label} className="!p-4">
                  <div className="dh-mono mb-1 !text-[var(--ink-faint)]">{m.label}</div>
                  <div className="text-sm font-semibold text-[var(--ink)]">{m.value}</div>
                </DhCard>
              ))}
            </div>
          )}
          {company.keyFigure?.value ? (
            <DhCard className="mt-10 max-w-sm">
              <div className="dh-mono mb-1 !text-[var(--ink-faint)]">{company.keyFigure.label}</div>
              <div className="text-2xl font-semibold text-[var(--ink)]">{company.keyFigure.value}</div>
            </DhCard>
          ) : null}
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="dh-btn dh-btn-fill mt-10 inline-flex items-center gap-2"
            >
              Visit website <ArrowRight className="h-4 w-4" />
            </a>
          )}
          <div className="mt-12">
            <Link href="/portfolio" className="dh-tlink inline-flex items-center gap-1.5 text-[13px]">
              ← Back to portfolio
            </Link>
          </div>
        </div>
      </DhSection>
    </PageShell>
  );
}
