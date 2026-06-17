"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { EcoIcon } from "@/components/shared/eco-icon";
import { SectionLabel } from "@/components/shared/section-label";
import { TextLink } from "@/components/shared/text-link";
import { portfolioFallback, type PortfolioFallbackItem } from "@/lib/fallbacks/home";
import type { Company } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

const colorMap = {
  cyan: "cyan",
  violet: "violet",
  magenta: "magenta",
  muted: "muted",
} as const;

function mapCompanyToCard(company: Company, index: number): PortfolioFallbackItem {
  const colors: PortfolioFallbackItem["color"][] = ["cyan", "violet", "muted", "magenta", "violet"];
  const metrics = company.metrics?.slice(0, 3).map((m) => [m.label, m.value] as [string, string]) ?? [
    ["Status", "Active"],
    ["", ""],
    ["", ""],
  ];
  while (metrics.length < 3) metrics.push(["", ""]);

  return {
    name: company.name,
    desc: company.description || "",
    metrics,
    link: "View Company",
    href: company.slug ? `/portfolio/${company.slug}` : company.website || "/portfolio",
    color: colors[index % colors.length],
    vi: index % 3,
    highlight: index < 2,
  };
}

type PortfolioGridProps = {
  companies?: Company[];
};

export function PortfolioGrid({ companies }: PortfolioGridProps) {
  const items =
    companies && companies.length > 0
      ? companies.map(mapCompanyToCard)
      : portfolioFallback;

  return (
    <Section>
      <Container>
        <div className="mb-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>Portfolio</SectionLabel>
            <h2 className="text-[30px] font-semibold text-foreground">
              Companies we build and scale.
            </h2>
          </div>
          <TextLink href="/portfolio" color="cyan">
            View all portfolio
          </TextLink>
        </div>

        <div className="flex gap-3.5 overflow-x-auto pb-2 snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {items.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="min-w-[220px] shrink-0 snap-start lg:min-w-0"
            >
              <Card className="flex min-h-[290px] flex-col">
                <div>
                  <div className="mb-3.5">
                    <EcoIcon variant={p.vi} size={44} />
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold text-foreground">{p.name}</h3>
                  <p className="mb-4 text-xs leading-snug text-gray-400">{p.desc}</p>
                </div>
                <div className="mt-auto">
                  <div className="grid grid-cols-3 gap-1 border-t border-white/[0.06] pt-3">
                    {p.metrics.map(([label, val], j) => (
                      <div key={j}>
                        <div className="mb-0.5 text-[10px] text-gray-600">{label}</div>
                        <div
                          className={cn(
                            "text-[13px] font-semibold",
                            val.startsWith("+") ? "text-[#00D4FF]" : "text-white",
                          )}
                        >
                          {val}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3.5">
                    <TextLink
                      href={p.href}
                      color={colorMap[p.color]}
                      external={p.href.startsWith("http")}
                    >
                      {p.link}
                    </TextLink>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
