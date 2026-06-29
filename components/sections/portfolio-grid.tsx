"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/animation/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EcoIcon } from "@/components/shared/eco-icon";
import { SectionLabel } from "@/components/shared/section-label";
import { TextLink } from "@/components/shared/text-link";
import { portfolioFallback, type PortfolioFallbackItem } from "@/lib/fallbacks/home";
import type { Company } from "@/lib/sanity/types";

const companyMeta: Record<string, { badge: string; href: string; link: string; desc: string }> = {
  konduit: {
    badge: "Supply",
    href: "https://konduit.tech",
    link: "konduit.tech",
    desc: "European-sourced hardware and infrastructure delivered to businesses across Southern Africa with full warranty and in-region support.",
  },
  bmkrs: {
    badge: "Brand studio",
    href: "https://bmkrs.com",
    link: "bmkrs.com",
    desc: "A brand company run by builders. Full-service brand development from naming through to digital presence.",
  },
  "freelance-near-me": {
    badge: "Marketplace",
    href: "https://freelancenearme.com",
    link: "freelancenearme.com",
    desc: "A marketplace connecting businesses with vetted local freelancers. Faster, more transparent hiring for both sides.",
  },
};

const colorMap = {
  cyan: "cyan",
  violet: "violet",
  magenta: "magenta",
  muted: "muted",
} as const;

const colors: PortfolioFallbackItem["color"][] = ["cyan", "violet", "magenta"];

function mapCompanyToCard(company: Company, index: number): PortfolioFallbackItem {
  const slug = company.slug || "";
  const meta = companyMeta[slug];
  const badge =
    meta?.badge ??
    (company.services?.[0] === "Marketplace"
      ? "Marketplace"
      : company.services?.[0] === "Supply"
        ? "Supply"
        : "Brand studio");

  return {
    name: company.name,
    desc: meta?.desc ?? company.description ?? "",
    badge,
    link: meta?.link ?? company.website?.replace(/^https?:\/\//, "") ?? "Visit site",
    href: meta?.href ?? company.website ?? `/portfolio/${slug}`,
    color: colors[index % colors.length],
    vi: index % 3,
  };
}

type PortfolioGridProps = {
  companies?: Company[];
};

export function PortfolioGrid({ companies }: PortfolioGridProps) {
  const featuredSlugs = new Set(["konduit", "bmkrs", "freelance-near-me"]);
  const sanityItems =
    companies && companies.length > 0
      ? companies
          .filter((c) => featuredSlugs.has(c.slug ?? ""))
          .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
          .map(mapCompanyToCard)
      : [];

  const items = sanityItems.length > 0 ? sanityItems : portfolioFallback;

  return (
    <Section>
      <Container>
        <Reveal className="mb-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>Portfolio</SectionLabel>
            <h2 className="text-[30px] font-semibold text-foreground">Companies we build and operate.</h2>
          </div>
          <TextLink href="/portfolio" color="cyan">
            View all portfolio
          </TextLink>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <StaggerItem key={p.name}>
              <Card className="flex min-h-[260px] flex-col">
                <div>
                  <div className="mb-3.5">
                    <EcoIcon variant={p.vi} size={44} />
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                    <Badge variant="default" className="text-[10px] uppercase tracking-wide">
                      {p.badge}
                    </Badge>
                  </div>
                  <p className="mb-4 text-xs leading-snug text-gray-400">{p.desc}</p>
                </div>
                <div className="mt-auto">
                  <TextLink
                    href={p.href}
                    color={colorMap[p.color]}
                    external={p.href.startsWith("http")}
                  >
                    {p.link}
                  </TextLink>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
