import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { prisma, hasDatabase } from "@/lib/db";
import { fetchVentures } from "@/lib/sanity";
import { Badge, Card, PageHeader, PortalShell } from "@/components/portal-shell";

export const metadata = { title: "Venture directory" };

export default async function VenturesDirectoryPage() {
  const gate = await requireRole(["INTERNAL"]);
  if (!gate.ok) redirect("/login");

  const [internal, publicVentures] = await Promise.all([
    hasDatabase()
      ? prisma.internalVenture.findMany({ orderBy: { updatedAt: "desc" } })
      : Promise.resolve([]),
    fetchVentures().catch(() => []),
  ]);

  return (
    <PortalShell role={gate.session.role} activeHref="/ventures">
      <PageHeader
        kicker="venture directory"
        title="Internal venture view."
        description="Structured operating view beyond the public ventures page — thesis, stage and status."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
            Internal records
          </h2>
          <div className="space-y-4">
            {internal.length === 0 ? (
              <Card>
                <p className="text-sm text-muted">Run db seed or add ventures via Postgres.</p>
              </Card>
            ) : (
              internal.map((venture) => (
                <Card key={venture.id}>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-[15px] font-semibold text-white">{venture.name}</h3>
                    <Badge>{venture.status}</Badge>
                  </div>
                  <p className="mb-2 text-[13px] text-cyan">{venture.stage}</p>
                  <p className="text-sm text-muted">{venture.thesis}</p>
                  {venture.internalNotes ? (
                    <p className="mt-3 border-t border-border pt-3 text-[13px] text-muted">
                      {venture.internalNotes}
                    </p>
                  ) : null}
                </Card>
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
            Public CMS ventures
          </h2>
          <div className="space-y-4">
            {publicVentures.map((venture) => (
              <Card key={venture.name}>
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-[15px] font-semibold text-white">{venture.name}</h3>
                  {venture.status ? <Badge>{venture.status}</Badge> : null}
                </div>
                <p className="mb-1 text-[13px] text-cyan">{venture.stage}</p>
                <p className="text-sm text-muted">{venture.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
