import Link from "next/link";
import { ecosystemPillars } from "@/lib/home/ecosystem";
import { CornerOrnament } from "@/components/home/home-svg";
import { HomeReveal } from "@/components/home/home-reveal";

function PillarMark({ type }: { type: "build" | "connect" | "back" }) {
  if (type === "build") {
    return (
      <svg className="pillar-mark mb-5 h-[52px] w-[52px]" viewBox="0 0 52 52" aria-hidden="true">
        <circle cx="26" cy="26" r="24" fill="none" stroke="var(--ledger)" strokeWidth="1" />
        <path d="M26 8 L26 44 M12 20 L40 20 M12 32 L40 32" stroke="var(--brass)" strokeWidth="1.2" fill="none" />
      </svg>
    );
  }
  if (type === "connect") {
    return (
      <svg className="pillar-mark mb-5 h-[52px] w-[52px]" viewBox="0 0 52 52" aria-hidden="true">
        <circle cx="26" cy="26" r="24" fill="none" stroke="var(--ledger)" strokeWidth="1" />
        <circle cx="18" cy="26" r="8" fill="none" stroke="var(--brass)" strokeWidth="1.2" />
        <circle cx="34" cy="26" r="8" fill="none" stroke="var(--brass)" strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg className="pillar-mark mb-5 h-[52px] w-[52px]" viewBox="0 0 52 52" aria-hidden="true">
      <circle cx="26" cy="26" r="24" fill="none" stroke="var(--ledger)" strokeWidth="1" />
      <path d="M12 38 Q20 36 26 26 T44 12" fill="none" stroke="var(--brass)" strokeWidth="1.2" />
      <circle cx="40" cy="14" r="2.4" fill="var(--ledger)" />
    </svg>
  );
}

export function HomeEcosystem() {
  return (
    <section className="cert relative border-y border-[var(--rule)] bg-[var(--sage)] py-[clamp(80px,11vh,140px)]">
      <CornerOrnament className="pointer-events-none absolute left-3.5 top-3.5 h-[26px] w-[26px] [&_path]:stroke-[var(--brass)] [&_path]:opacity-75" />
      <CornerOrnament className="pointer-events-none absolute right-3.5 top-3.5 h-[26px] w-[26px] rotate-90 [&_path]:stroke-[var(--brass)] [&_path]:opacity-75" />
      <CornerOrnament className="pointer-events-none absolute bottom-3.5 right-3.5 h-[26px] w-[26px] rotate-180 [&_path]:stroke-[var(--brass)] [&_path]:opacity-75" />
      <CornerOrnament className="pointer-events-none absolute bottom-3.5 left-3.5 h-[26px] w-[26px] rotate-[270deg] [&_path]:stroke-[var(--brass)] [&_path]:opacity-75" />

      <div className="dh-container">
        <HomeReveal>
          <div className="dh-eyebrow">
            <span className="dh-mono">Our ecosystem</span>
          </div>
          <h2 className="dh-h2">An integrated holding company ecosystem.</h2>
          <p className="dh-lede mt-4 text-[var(--ink-dim)]">
            Three pillars. One mission. Durable digital equity.
          </p>
        </HomeReveal>

        <div className="mt-[clamp(40px,6vh,64px)] grid gap-4 min-[820px]:grid-cols-3 min-[820px]:gap-7">
          {ecosystemPillars.map((pillar) => (
            <HomeReveal key={pillar.name}>
              <article className="group relative overflow-hidden rounded-[2px] border border-[var(--rule)] bg-[var(--paper)] p-[clamp(26px,3vw,38px)] transition-[transform,box-shadow] duration-250 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgb(16_22_35/0.09)]">
                <span
                  className="pointer-events-none absolute -right-2 -top-6 font-[family-name:var(--font-display)] text-[7rem] font-normal italic leading-none text-[var(--brass)] opacity-[0.08]"
                  aria-hidden="true"
                >
                  {pillar.numeral}
                </span>
                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,var(--ledger),var(--brass))] transition-transform duration-300 group-hover:scale-x-100" />
                <PillarMark type={pillar.mark} />
                <span className="dh-mono mb-2 block text-[var(--brass)]">
                  {pillar.numeral} · {pillar.verb}
                </span>
                <h3 className="dh-display mb-2.5 text-[1.6rem] font-medium">{pillar.name}</h3>
                <p className="mb-5 max-w-[32ch] text-[0.98rem] text-[var(--ink-dim)]">{pillar.description}</p>
                <Link
                  href={pillar.href}
                  className="dh-tlink"
                  {...(pillar.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {pillar.linkLabel} →
                </Link>
              </article>
            </HomeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
