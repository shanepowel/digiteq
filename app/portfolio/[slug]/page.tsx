import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
