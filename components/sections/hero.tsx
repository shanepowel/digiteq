"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Reveal, WordReveal } from "@/components/animation/motion";
import { brandAlt, brandAssets } from "@/lib/brand";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background pb-16 pt-24">
      <div className="hero-grid pointer-events-none absolute inset-0" />

      <div
        className="pointer-events-none absolute top-[10%] left-[15%] h-[70%] w-[70%] blur-[50px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, rgba(217,70,239,0.06) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="max-w-[540px] shrink-0">
          <h1 className="mb-6 text-[clamp(2.5rem,5vw,68px)] font-bold leading-[1.04] tracking-[-0.02em] text-white">
            <WordReveal text="Building" />
            <br />
            <WordReveal text="Digital Equity" delay={0.08} />
          </h1>
          <Reveal delay={0.1}>
            <p className="mb-10 max-w-[400px] text-lg leading-relaxed text-gray-400">
              We create, acquire and scale digital brands, products and media properties.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-3.5">
              <Button asChild>
                <Link href="/portfolio">
                  Explore Portfolio <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/contact">
                  Partner With Us <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.16} direction="none">
          <div className="relative h-[min(400px,70vw)] w-full max-w-[400px] shrink-0 lg:h-[400px] lg:w-[400px]">
            <Image
              src={brandAssets.hero3d}
              alt={brandAlt.hero3d}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 70vw, 400px"
            />
          </div>
        </Reveal>
      </Container>

      <div className="absolute bottom-9 left-1/2 -translate-x-1/2">
        <ChevronDown className="h-5 w-5 text-gray-600" />
      </div>
    </section>
  );
}
