"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { BarChart } from "@/components/shared/bar-chart";

export function InvestmentCta() {
  return (
    <section className="px-6 pb-24 pt-16 sm:px-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative flex flex-col items-center justify-between gap-10 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#0C0D1A] to-[#111330] px-8 py-16 sm:px-16 lg:flex-row"
        >
          <div className="relative z-10 max-w-[420px]">
            <h2 className="mb-4 text-[clamp(1.75rem,3vw,2.375rem)] font-bold leading-tight text-foreground">
              Looking to sell your digital business?
            </h2>
            <p className="mb-8 text-[15px] leading-relaxed text-muted">
              We partner with founders to unlock the next chapter. Fair process. Fast decisions.
              Aligned outcomes.
            </p>
            <Button variant="rose" asChild>
              <Link href="/contact">
                Start a Conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative z-10 hidden sm:block">
            <BarChart />
          </div>
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-[380px] w-[380px] blur-[50px]"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)",
            }}
          />
        </motion.div>
      </Container>
    </section>
  );
}
