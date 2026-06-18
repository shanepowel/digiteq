import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { prisma, hasDatabase } from "@/lib/db";
import { dealStageLabels, dealStages } from "@/lib/constants";
import { Badge, Card, PageHeader, PortalShell } from "@/components/portal-shell";
import { DealStageForm } from "@/components/deal-stage-form";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  if (!hasDatabase()) return { title: "Deal" };
  const deal = await prisma.pipelineDeal.findUnique({ where: { id } });
  return { title: deal?.name ?? "Deal" };
}

export default async function PipelineDealPage({ params }: Props) {
  const gate = await requireRole(["INTERNAL"]);
  if (!gate.ok) redirect("/login");

  const { id } = await params;
  if (!hasDatabase()) notFound();

  const deal = await prisma.pipelineDeal.findUnique({
    where: { id },
    include: {
      notes: { include: { author: true }, orderBy: { createdAt: "desc" } },
    },
  });

  if (!deal) notFound();

  return (
    <PortalShell role={gate.session.role} activeHref="/pipeline">
      <Link href="/pipeline" className="mb-6 inline-block text-[13px] text-muted hover:text-white">
        ← back to pipeline
      </Link>
      <PageHeader
        kicker="deal"
        title={deal.name}
        description={deal.summary ?? undefined}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card>
            <h2 className="mb-4 text-[14px] font-semibold text-white">Details</h2>
            <dl className="grid gap-3 text-sm">
              {[
                ["Website", deal.website],
                ["Industry", deal.industry],
                ["Revenue", deal.revenueRange],
                ["Contact", deal.contactName],
                ["Email", deal.contactEmail],
                ["Source", deal.source],
              ]
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[120px_1fr] gap-2">
                    <dt className="text-muted">{label}</dt>
                    <dd className="text-white">{value}</dd>
                  </div>
                ))}
            </dl>
          </Card>

          <Card>
            <h2 className="mb-4 text-[14px] font-semibold text-white">Activity</h2>
            {deal.notes.length === 0 ? (
              <p className="text-sm text-muted">No notes yet.</p>
            ) : (
              <ul className="space-y-4">
                {deal.notes.map((note) => (
                  <li key={note.id} className="border-b border-border pb-4 last:border-0">
                    <p className="text-sm text-white">{note.body}</p>
                    <p className="mt-2 text-[11px] text-muted">
                      {note.author.name ?? note.author.email} · {formatDate(note.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[12px] text-muted">Stage</span>
              <Badge>{dealStageLabels[deal.stage]}</Badge>
            </div>
            <p className="mb-4 text-[11px] text-muted">Updated {formatDate(deal.updatedAt)}</p>
            <DealStageForm dealId={deal.id} currentStage={deal.stage} stages={dealStages} />
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}
