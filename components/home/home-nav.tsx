"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { homeNavigation } from "@/lib/home/navigation";
import { Rosette } from "@/components/home/home-svg";
import { cn } from "@/lib/utils";

export function HomeNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--rule)] bg-[rgb(246_244_238/0.85)] backdrop-blur-[12px]">
      <div className="dh-container flex h-[68px] items-center justify-between">
        <Link href="/" className="dh-display flex items-center gap-2.5 text-[1.35rem] font-semibold tracking-[-0.01em] text-[var(--ink)]">
          <Rosette className="h-[26px] w-[26px]" />
          Digiteq<span className="font-normal italic text-[var(--ledger)]">.</span>
        </Link>

        <ul className="hidden items-center gap-[clamp(14px,2.4vw,30px)] lg:flex">
          {homeNavigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "pb-1.5 text-[0.92rem] text-[var(--ink-dim)] transition-colors hover:text-[var(--ink)]",
                  pathname === item.href && "dh-nav-active text-[var(--ink)]",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="dh-btn">
              Partner with us
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="p-2 text-[var(--ink)] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--rule)] bg-[var(--paper)] px-5 py-6 lg:hidden">
          <ul className="flex flex-col gap-4">
            {homeNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[1rem] text-[var(--ink-dim)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="dh-btn mt-2 inline-block" onClick={() => setOpen(false)}>
                Partner with us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
