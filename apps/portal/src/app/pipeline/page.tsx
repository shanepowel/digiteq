import Link from "next/link";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { prisma, hasDatabase, isMissingSchemaError } from "@/lib/db";
import { dealStageLabels, dealStages } from "@/lib/constants";
import { Badge, Card, PageHeader, PortalShell } from "@/components/portal-shell";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Acquisition pipeline" };

export default async function PipelinePage() {
  const gate = await requireRole(["INTERNAL"]);
  if (!gate.ok) redirect("/login");

  let deals: Awaited<ReturnType<typeof prisma.pipelineDeal.findMany>> = [];
  let schemaMissing = false;

  if (hasDatabase()) {
    try {
      deals = await prisma.pipelineDeal.findMany({ orderBy: { updatedAt: "desc" } });
    } catch (error) {
      if (isMissingSchemaError(error)) {
        schemaMissing = true;
      } else {
        throw error;
      }
    }
  }

  const grouped = dealStages.map((stage) => ({
    stage,
    label: dealStageLabels[stage],
    deals: deals.filter((deal) => deal.stage === stage),
  }));

  return (
    <PortalShell role={gate.session.role} activeHref="/pipeline">
      <PageHeader
        kicker="acquisition pipeline"
        title="Deal flow."
        description="Track inbound opportunities from first conversation through diligence and close."
      />

      {!hasDatabase() || schemaMissing ? (
        <Card>
          <p className="text-sm text-muted">
            {schemaMissing ? (
              <>
                Database is connected but tables are missing. Redeploy the portal (build runs{" "}
                <code className="text-cyan">prisma db push</code>) or run{" "}
                <code className="text-cyan">npm run db:push</code> against your production{" "}
                <code className="text-cyan">DATABASE_URL</code>, then{" "}
                <code className="text-cyan">npm run db:seed</code> for sample deals.
              </>
            ) : (
              <>
                Set <code className="text-cyan">DATABASE_URL</code> and run{" "}
                <code className="text-cyan">npm run db:push</code> to enable the pipeline.
              </>
            )}
          </p>
        </Card>
      ) : (
        <div className="grid gap-5 lg:grid-cols-5">
          {grouped.map((column) => (
            <div key={column.stage} className="min-w-0">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
                  {column.label}
                </h2>
                <Badge>{column.deals.length}</Badge>
              </div>
              <div className="space-y-3">
                {column.deals.map((deal) => (
                  <Link key={deal.id} href={`/pipeline/${deal.id}`}>
                    <Card className="transition-colors hover:border-white/20">
                      <h3 className="mb-1 text-[14px] font-semibold text-white">{deal.name}</h3>
                      {deal.revenueRange ? (
                        <p className="mb-2 text-[12px] text-muted">{deal.revenueRange}</p>
                      ) : null}
                      <p className="text-[11px] text-muted">{formatDate(deal.updatedAt)}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
