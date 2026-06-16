"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Hero3DMark } from "@/components/brand/hero-3d-mark";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-background to-[#0A0C18] px-6 pb-16 pt-24 sm:px-12">
      <div className="hero-grid pointer-events-none absolute inset-0" />

      <Container className="relative z-10 flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-16">
        <div className="max-w-[540px]">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.04] tracking-[-0.02em] text-foreground"
          >
            Building
            <br />
            Digital Equity
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mb-10 max-w-[400px] text-lg leading-relaxed text-muted"
          >
            We create, acquire and scale digital brands, products and media properties.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex flex-wrap gap-3.5"
          >
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
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.16, duration: 0.8 }}
        >
          <Hero3DMark />
        </motion.div>
      </Container>

      <div className="absolute bottom-9 left-1/2 -translate-x-1/2">
        <ChevronDown className="h-[22px] w-[22px] text-muted-dark" />
      </div>
    </section>
  );
}
