import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { portfolioCompanyBySlug, isPortfolioSlug, PORTFOLIO_SLUGS } from "@/lib/portfolio/companies";
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
  const fallback = isPortfolioSlug(slug) ? portfolioCompanyBySlug[slug] : undefined;
  return { title: fallback?.name || "Company" };
}

export async function generateStaticParams() {
  const slugSet = new Set<string>(PORTFOLIO_SLUGS);

  try {
    const slugs = await getSanityClient().fetch<{ slug: string }[]>(ALL_COMPANY_SLUGS);
    slugs.forEach(({ slug }) => slugSet.add(slug));
  } catch {
    // Sanity not configured
  }

  return [...slugSet].map((slug) => ({ slug }));
}

async function getCompany(slug: string): Promise<Company | null> {
  if (!isPortfolioSlug(slug)) return null;

  try {
    const company = await getSanityClient().fetch<Company | null>(COMPANY_BY_SLUG, { slug });
    if (company) return company;
  } catch {
    // Sanity not configured
  }

  const fallback = portfolioCompanyBySlug[slug];
  return {
    _id: `fallback-${slug}`,
    name: fallback.name,
    slug,
    description: fallback.description,
    website: fallback.website,
    category: fallback.category,
  };
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const company = await getCompany(slug);

  if (!company) notFound();

  return (
    <>
      <Nav />
      <main className="pt-16">
        <section className="px-6 py-24 sm:px-12">
          <Container>
            <h1 className="text-4xl font-bold text-foreground">{company.name}</h1>
            {company.description && (
              <p className="mt-6 max-w-2xl text-lg text-muted">{company.description}</p>
            )}
            {company.services && company.services.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {company.services.map((s) => (
                  <Badge key={s} variant="cyan">
                    {s}
                  </Badge>
                ))}
              </div>
            )}
            {company.metrics && company.metrics.length > 0 && (
              <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
                {company.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-xs text-muted-dark">{m.label}</div>
                    <div className="text-sm font-semibold text-foreground">{m.value}</div>
                  </div>
                ))}
              </div>
            )}
            {company.website && (
              <Button className="mt-10" asChild>
                <Link href={company.website} target="_blank" rel="noopener noreferrer">
                  Visit website
                </Link>
              </Button>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
