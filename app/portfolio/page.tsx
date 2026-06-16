import { ContentPage } from "@/components/content-page";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { EcoIcon } from "@/components/shared/eco-icon";
import { TextLink } from "@/components/shared/text-link";
import { portfolioFallback } from "@/lib/fallbacks/home";
import { getSanityClient } from "@/lib/sanity/client";
import { PORTFOLIO_QUERY } from "@/lib/sanity/queries";
import type { Company } from "@/lib/sanity/types";

export const metadata = { title: "Portfolio" };

export default async function PortfolioPage() {
  let companies: Company[] = [];
  try {
    companies = await getSanityClient().fetch<Company[]>(PORTFOLIO_QUERY);
  } catch {
    companies = [];
  }

  const items =
    companies.length > 0
      ? companies.map((c, i) => ({
          name: c.name,
          desc: c.description || "",
          href: c.slug ? `/portfolio/${c.slug}` : c.website || "#",
          vi: i % 3,
        }))
      : portfolioFallback.map((p) => ({
          name: p.name,
          desc: p.desc,
          href: p.href,
          vi: p.vi,
        }));

  return (
    <ContentPage page="portfolio">
      <section className="px-6 pb-24 sm:px-12">
        <Container>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {items.map((item) => (
              <Card key={item.name} className="flex min-h-[220px] flex-col justify-between p-5">
                <div>
                  <EcoIcon variant={item.vi} size={38} />
                  <h3 className="mt-3 text-sm font-semibold text-foreground">{item.name}</h3>
                  <p className="mt-1 text-xs text-muted">{item.desc}</p>
                </div>
                <TextLink
                  href={item.href}
                  color="cyan"
                  external={item.href.startsWith("http")}
                >
                  View Company
                </TextLink>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </ContentPage>
  );
}
