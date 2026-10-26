"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { brandAlt, brandAssets } from "@/lib/brand";
import { Rosette } from "@/components/home/home-svg";

type IndexReading = {
  value: string;
  label: string;
  count?: number;
  pad?: number;
};

type HomeHeroProps = {
  holdingsCount: number;
  disciplinesCount?: number;
};

function useCountUp(target: number, pad: number, active: boolean, reduced: boolean) {
  const [value, setValue] = useState(reduced ? String(target).padStart(pad, "0") : "0".repeat(pad));

  useEffect(() => {
    if (!active || reduced) {
      setValue(String(target).padStart(pad, "0"));
      return;
    }

    const start = performance.now() + 900;
    const duration = 700;
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(Math.max((now - start) / duration, 0), 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(String(Math.round(target * eased)).padStart(pad, "0"));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, pad, reduced, target]);

  return value;
}

function IndexCounter({
  reading,
  active,
  reduced,
}: {
  reading: IndexReading;
  active: boolean;
  reduced: boolean;
}) {
  const count = useCountUp(reading.count ?? 0, reading.pad ?? 2, active, reduced);
  const display = reading.count !== undefined ? count : reading.value;

  return (
    <div>
      <b className="dh-tabular block text-[1.15rem] font-medium text-[var(--ledger-deep)]">{display}</b>
      <span className="dh-mono">{reading.label}</span>
    </div>
  );
}

export function HomeHero({ holdingsCount, disciplinesCount = 3 }: HomeHeroProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(reduced ?? false);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setActive(true), 300);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setParallaxY(window.scrollY * 0.1);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  const readings: IndexReading[] = [
    { value: "", label: "Holdings", count: holdingsCount, pad: 2 },
    { value: "", label: "Disciplines", count: disciplinesCount, pad: 2 },
    { value: "MMXXI", label: "Founded" },
  ];

  return (
    <header className="dh-hero relative overflow-hidden pt-[clamp(64px,10vh,112px)]">
      <div className="dh-hero-wash" aria-hidden="true" />
      <div
        className="pointer-events-none absolute top-[clamp(20px,4vh,48px)] right-[max(-18vw,calc((100vw-var(--home-max))/2-160px))] h-[clamp(300px,38vw,560px)] w-[clamp(300px,38vw,560px)] opacity-70 max-[900px]:hidden"
        style={{ transform: `translateY(${parallaxY}px)` }}
        aria-hidden="true"
      >
        <Rosette
          className="h-full w-full"
          style={reduced ? undefined : { animation: "dh-spin 240s linear infinite" }}
        />
      </div>

      <div className="dh-container relative z-[1]">
        <div className="grid items-end gap-[clamp(28px,5vw,64px)] min-[900px]:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.div
              className="dh-eyebrow"
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.45, ease: [0.6, 0, 0.2, 1] }}
            >
              <span className="dh-mono">Digiteq Holdings · London</span>
            </motion.div>

            <motion.h1
              className="dh-h1 relative z-[1] !max-w-[12ch]"
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0 : 0.65,
                delay: reduced ? 0 : 0.06,
                ease: [0.6, 0, 0.2, 1],
              }}
            >
              Building digital{" "}
              <span className="relative inline-block font-normal italic">
                <span
                  className="bg-[linear-gradient(105deg,var(--ledger)_55%,var(--brass)_130%)] bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  equity
                </span>
                <svg
                  viewBox="0 0 300 20"
                  preserveAspectRatio="none"
                  className="absolute bottom-[-0.08em] left-0 h-[0.16em] w-full overflow-visible"
                  aria-hidden="true"
                >
                  <path
                    d="M4 14 C 80 4, 180 20, 296 8"
                    fill="none"
                    stroke="var(--brass)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeDasharray="600"
                    strokeDashoffset={active || reduced ? 0 : 600}
                    style={
                      active && !reduced
                        ? { animation: "dh-flourish 1.2s cubic-bezier(.6,0,.2,1) 1.2s forwards" }
                        : undefined
                    }
                  />
                </svg>
              </span>
              .
            </motion.h1>

            <motion.p
              className="dh-lede relative z-[1] my-[1.35rem] max-w-[42ch]"
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0 : 0.55,
                delay: reduced ? 0 : 0.14,
                ease: [0.6, 0, 0.2, 1],
              }}
            >
              We build, acquire, supply and invest in technology — operating independent brands with
              shared capital and long-term ownership.
            </motion.p>

            <motion.div
              className="relative z-[1] flex flex-wrap gap-3.5"
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0 : 0.5,
                delay: reduced ? 0 : 0.22,
                ease: [0.6, 0, 0.2, 1],
              }}
            >
              <Link href="#register" className="dh-btn dh-btn-fill">
                Explore portfolio
              </Link>
              <Link href="/investment" className="dh-btn">
                Sell your business
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="relative flex justify-center min-[900px]:justify-end"
            initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.1, ease: [0.6, 0, 0.2, 1] }}
          >
            <Image
              src={brandAssets.hero3d}
              alt={brandAlt.hero3d}
              width={520}
              height={390}
              priority
              className="dh-hero-brand relative z-[1] h-auto w-[min(100%,420px)] object-contain drop-shadow-[0_24px_50px_rgb(16_22_35/0.16)] max-[900px]:w-[min(78%,340px)]"
            />
          </motion.div>
        </div>

        <div className="relative z-[1] mt-[clamp(48px,8vh,80px)] pb-[clamp(48px,7vh,80px)]">
          <div className="relative h-px overflow-hidden bg-[var(--rule)]">
            <motion.i
              className="absolute inset-0 block origin-left bg-[linear-gradient(90deg,var(--ledger),var(--brass))]"
              initial={{ scaleX: reduced ? 1 : 0 }}
              animate={{ scaleX: active || reduced ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 1.05, ease: [0.6, 0, 0.2, 1] }}
            />
          </div>
          <div className="flex flex-wrap gap-[clamp(28px,6vw,72px)] pt-4">
            {readings.map((reading, i) => (
              <motion.div
                key={reading.label}
                initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 6 }}
                animate={{ opacity: active || reduced ? 1 : 0, y: active || reduced ? 0 : 6 }}
                transition={{
                  duration: reduced ? 0 : 0.5,
                  delay: reduced ? 0 : 0.85 + i * 0.1,
                  ease: "easeOut",
                }}
              >
                <IndexCounter reading={reading} active={active} reduced={Boolean(reduced)} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
