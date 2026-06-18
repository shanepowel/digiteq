import Link from "next/link";
import { Card, PageHeader } from "@/components/portal-shell";
import { marketingUrl, venturesUrl } from "@/lib/utils";

export const metadata = {
  title: "Digiteq Ventures",
  description: "Digiteq Ventures backs and builds the next generation of digital-first companies.",
};

export default function VenturesMicrositePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border px-6 py-5 lg:px-12">
        <div className="mx-auto flex max-w-[960px] items-center justify-between">
          <Link href="/ventures-site" className="text-sm font-semibold text-white">
            digiteq ventures
          </Link>
          <div className="flex gap-5 text-[13px]">
            <Link href={marketingUrl} className="text-muted hover:text-white">
              digiteq.io
            </Link>
            <Link href="/login" className="text-cyan hover:underline">
              portal login
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[960px] px-6 py-16 lg:px-12">
        <PageHeader
          kicker="digiteq ventures"
          title="Operator-led capital for digital-first companies."
          description="Pre-seed through scale. We invest where organic demand, clean financials and operational upside align with the Digiteq group."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Thesis-led",
              body: "Every check starts with a view on durable organic demand and defensible distribution.",
            },
            {
              title: "Operator bench",
              body: "Portfolio companies access shared growth, product and technology capability across the group.",
            },
            {
              title: "Aligned outcomes",
              body: "We optimise for long-term digital equity, not campaign cycles.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <h2 className="mb-2 text-[15px] font-semibold text-white">{item.title}</h2>
              <p className="text-sm text-muted">{item.body}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-gradient-to-br from-[#0C0D1A] to-[#111330] p-10">
          <h2 className="mb-3 text-[22px] font-bold text-white">Start a conversation.</h2>
          <p className="mb-6 max-w-[480px] text-sm text-muted">
            Founders and co-investors can reach the team through the main site or the operating portal.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${marketingUrl}/contact`}
              className="inline-flex rounded-[10px] bg-gradient-to-br from-[#FF2D7B] to-[#D946EF] px-5 py-2.5 text-sm font-medium text-white"
            >
              contact digiteq
            </Link>
            <Link
              href={venturesUrl}
              className="inline-flex rounded-[10px] border border-border px-5 py-2.5 text-sm text-white hover:border-white/20"
            >
              ventures.digiteq.io
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
