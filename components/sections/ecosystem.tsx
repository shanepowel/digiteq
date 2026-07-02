"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/animation/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { EcoIcon } from "@/components/shared/eco-icon";
import { SectionLabel } from "@/components/shared/section-label";
import { pillars } from "@/lib/fallbacks/home";

export function Ecosystem() {
  return (
    <Section>
      <Container>
        <Reveal className="mb-10 max-w-[720px]">
          <SectionLabel>What we do</SectionLabel>
          <p className="text-[15px] leading-[1.7] text-gray-400">
            Digiteq is a technology holding company. We operate across four pillars: building
            original products and brands, acquiring businesses with unrealised potential, supplying
            enterprise technology into high-growth markets, and deploying capital where technology
            meets unmet demand.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <StaggerItem key={pillar.title}>
              <Card className="h-full">
                <div className="mb-4">
                  <EcoIcon variant={i} size={44} />
                </div>
                <h3 className="mb-2 text-[15px] font-semibold text-foreground">{pillar.title}</h3>
                <p className="text-[13px] leading-snug text-gray-400">{pillar.desc}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
