"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

    const start = performance.now() + 1050;
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
          setParallaxY(window.scrollY * 0.12);
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
    <header className="relative pt-[clamp(80px,13vh,150px)]">
      <div
        className="pointer-events-none absolute top-[clamp(30px,6vh,70px)] right-[max(-14vw,calc((100vw-var(--home-max))/2-140px))] h-[clamp(340px,42vw,620px)] w-[clamp(340px,42vw,620px)] opacity-90 max-[820px]:right-[-32vw] max-[820px]:top-0 max-[820px]:h-[80vw] max-[820px]:w-[80vw] max-[820px]:opacity-45"
        style={{ transform: `translateY(${parallaxY}px)` }}
        aria-hidden="true"
      >
        <Rosette
          className="h-full w-full"
          style={reduced ? undefined : { animation: "dh-spin 240s linear infinite" }}
        />
      </div>

      <div className="dh-container relative z-[1]">
        <div className="dh-eyebrow">
          <span className="dh-mono">Digiteq Holdings · Est. London</span>
        </div>

        <h1 className="dh-h1 relative z-[1]">
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
                    ? { animation: "dh-flourish 1.2s cubic-bezier(.6,0,.2,1) 1.5s forwards" }
                    : undefined
                }
              />
            </svg>
          </span>
          .
        </h1>

        <p className="dh-lede relative z-[1] my-[1.8rem] max-w-[46ch]">
          We create, acquire and scale digital brands, products and media properties.
        </p>

        <div className="relative z-[1] mb-[clamp(56px,9vh,96px)] flex flex-wrap gap-3.5">
          <Link href="#register" className="dh-btn dh-btn-fill">
            Explore portfolio
          </Link>
          <Link href="#vault" className="dh-btn">
            Partner with us
          </Link>
        </div>

        <div className="relative z-[1] pb-[clamp(64px,9vh,100px)]">
          <div className="relative h-px overflow-hidden bg-[var(--rule)]">
            <motion.i
              className="absolute inset-0 block origin-left bg-[linear-gradient(90deg,var(--ledger),var(--brass))]"
              initial={{ scaleX: reduced ? 1 : 0 }}
              animate={{ scaleX: active || reduced ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 1.1, ease: [0.6, 0, 0.2, 1] }}
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
                  delay: reduced ? 0 : 1.05 + i * 0.15,
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
