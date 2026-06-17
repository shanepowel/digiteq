"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/animation/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { EcoIcon } from "@/components/shared/eco-icon";
import { SectionLabel } from "@/components/shared/section-label";
import { TextLink } from "@/components/shared/text-link";
import { ecoCards } from "@/lib/fallbacks/home";

export function Ecosystem() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-4">
          <Reveal className="pr-3">
            <SectionLabel>Our Ecosystem</SectionLabel>
            <h2 className="mb-2.5 text-[22px] font-semibold leading-snug text-foreground">
              An integrated holding company ecosystem.
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-gray-400">
              Three pillars. One mission. Durable digital equity.
            </p>
            <TextLink href="/about" color="cyan">
              Learn more about our approach
            </TextLink>
          </Reveal>

          <Stagger className="contents lg:col-span-3 lg:grid lg:grid-cols-3 lg:gap-5">
            {ecoCards.map((card, i) => (
              <StaggerItem key={card.name} className="lg:col-span-1">
                <Card className="h-full">
                  <div className="mb-4">
                    <EcoIcon variant={i} size={44} />
                  </div>
                  <h3 className="mb-2 text-[15px] font-semibold text-foreground">{card.name}</h3>
                  <p className="mb-5 min-h-10 text-[13px] leading-snug text-gray-400">{card.desc}</p>
                  <TextLink href={card.href} color={card.color} external={card.href.startsWith("http")}>
                    {card.link}
                  </TextLink>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
