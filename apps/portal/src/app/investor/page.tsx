import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { prisma, hasDatabase } from "@/lib/db";
import { fetchPortfolioCompanies } from "@/lib/sanity";
import { Badge, Card, PageHeader, PortalShell } from "@/components/portal-shell";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Investor portal" };

export default async function InvestorPortalPage() {
  const gate = await requireRole(["INTERNAL", "INVESTOR"]);
  if (!gate.ok) redirect("/login");

  const [documents, companies] = await Promise.all([
    hasDatabase()
      ? prisma.investorDocument.findMany({ orderBy: { publishedAt: "desc" } })
      : Promise.resolve([]),
    fetchPortfolioCompanies().catch(() => []),
  ]);

  return (
    <PortalShell role={gate.session.role} activeHref="/investor">
      <PageHeader
        kicker="investor portal"
        title="Portfolio updates."
        description="Gated access to holdings overview, quarterly updates and documents."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-[14px] font-semibold text-white">Documents</h2>
          {documents.length === 0 ? (
            <p className="text-sm text-muted">
              No documents yet. Add LP updates via the database seed or admin tooling.
            </p>
          ) : (
            <ul className="space-y-4">
              {documents.map((doc) => (
                <li key={doc.id} className="border-b border-border pb-4 last:border-0">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-[14px] font-medium text-white">{doc.title}</h3>
                    {doc.quarter ? <Badge>{doc.quarter}</Badge> : null}
                  </div>
                  <p className="text-sm text-muted">{doc.description}</p>
                  <p className="mt-2 text-[11px] text-muted">{formatDate(doc.publishedAt)}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="mb-4 text-[14px] font-semibold text-white">Holdings snapshot</h2>
          <ul className="space-y-3">
            {companies.map((company) => (
              <li key={company.slug} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-white">{company.name}</span>
                <Badge>portfolio</Badge>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[12px] text-muted">
            Performance metrics will be published here when available. No fabricated numbers are shown.
          </p>
        </Card>
      </div>
    </PortalShell>
  );
}
