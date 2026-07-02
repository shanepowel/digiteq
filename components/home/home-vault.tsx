import Link from "next/link";
import { Rosette } from "@/components/home/home-svg";
import { HomeReveal } from "@/components/home/home-reveal";

function VaultSeal() {
  return (
    <div className="relative h-[clamp(150px,16vw,190px)] w-[clamp(150px,16vw,190px)] justify-self-end max-[820px]:justify-self-start" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
        <defs>
          <path id="dh-seal-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <circle cx="100" cy="100" r="88" fill="none" stroke="var(--brass)" strokeWidth="0.8" opacity="0.8" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="var(--brass)" strokeWidth="0.8" opacity="0.8" />
        <g style={{ animation: "dh-spin 40s linear infinite", transformOrigin: "100px 100px" }}>
          <text className="fill-[var(--brass-bright)] font-[family-name:var(--font-mono)] text-[12.5px] tracking-[0.32em]">
            <textPath href="#dh-seal-circle">
              DIGITEQ HOLDINGS · LONDON · DIGITAL EQUITY ·
            </textPath>
          </text>
        </g>
        <g transform="translate(58,58) scale(0.42)">
          <use href="#dh-rosette" />
        </g>
      </svg>
    </div>
  );
}

export function HomeVault() {
  return (
    <section
      id="vault"
      className="relative overflow-hidden bg-[radial-gradient(120%_140%_at_85%_10%,var(--vault-2)_0%,var(--vault)_55%)] py-[clamp(80px,11vh,140px)] text-[var(--vault-text)]"
    >
      <div className="pointer-events-none absolute right-[-160px] top-1/2 h-[520px] w-[520px] -translate-y-1/2 opacity-50 max-[820px]:right-[-200px] max-[820px]:h-[380px] max-[820px]:w-[380px]" aria-hidden="true">
        <Rosette className="h-full w-full" />
      </div>

      <div className="dh-container relative">
        <HomeReveal>
          <div className="grid items-center gap-[clamp(28px,5vw,72px)] min-[820px]:grid-cols-[1fr_auto]">
            <div>
              <div className="dh-eyebrow">
                <span className="dh-mono text-[rgb(232_230_223/0.5)]">Acquisitions</span>
              </div>
              <h2 className="dh-h2 mb-6 max-w-[18ch] text-[var(--vault-text)]">
                Looking to sell your digital business?
              </h2>
              <p className="mb-8 max-w-[48ch] text-[rgb(232_230_223/0.7)]">
                We partner with founders to unlock the next chapter.
              </p>
              <div className="dh-mono mb-9 max-w-[560px] border-y border-[var(--rule-dark)] py-4 text-[0.75rem] tracking-[0.14em] text-[rgb(232_230_223/0.65)]">
                <b className="font-normal text-[var(--brass-bright)]">Fair process</b>
                <span className="px-3">·</span>
                <b className="font-normal text-[var(--brass-bright)]">Fast decisions</b>
                <span className="px-3">·</span>
                <b className="font-normal text-[var(--brass-bright)]">Aligned outcomes</b>
              </div>
              <Link href="/investment" className="dh-btn dh-btn-paper">
                Start a conversation
              </Link>
            </div>
            <VaultSeal />
          </div>
        </HomeReveal>
      </div>
    </section>
  );
}
