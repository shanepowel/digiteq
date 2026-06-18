import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { fetchCompanyBySlug, fetchPortfolioCompanies } from "@/lib/sanity";
import { Badge, Card, PageHeader, PortalShell } from "@/components/portal-shell";

export const metadata = { title: "Founder dashboard" };

type Props = { searchParams: Promise<{ company?: string }> };

export default async function FounderDashboardPage({ searchParams }: Props) {
  const gate = await requireRole(["INTERNAL", "FOUNDER"]);
  if (!gate.ok) redirect("/login");

  const { company: companyParam } = await searchParams;
  const slug = gate.session.role === "FOUNDER" ? gate.session.companySlug : companyParam;

  let company = slug ? await fetchCompanyBySlug(slug).catch(() => null) : null;
  const portfolio = !company ? await fetchPortfolioCompanies().catch(() => []) : [];

  if (!company && slug) {
    company = portfolio.find((item) => item.slug === slug) ?? null;
  }

  return (
    <PortalShell role={gate.session.role} activeHref="/founder">
      <PageHeader
        kicker="founder dashboard"
        title={company ? company.name : "Portfolio company"}
        description="Metrics, status and shared resources for portfolio founders."
      />

      {company ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <Card>
            <h2 className="mb-3 text-[14px] font-semibold text-white">Overview</h2>
            <p className="text-sm leading-relaxed text-muted">
              {company.description || "No description in Sanity yet."}
            </p>
          </Card>
          <Card>
            <h2 className="mb-4 text-[14px] font-semibold text-white">Metrics</h2>
            {company.metrics && company.metrics.length > 0 ? (
              <dl className="space-y-3">
                {company.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="text-[11px] text-muted">{metric.label}</dt>
                    <dd className="text-[18px] font-semibold text-white">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-sm text-muted">Metrics will appear when added in Sanity.</p>
            )}
          </Card>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((item) => (
            <Card key={item.slug}>
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-[15px] font-semibold text-white">{item.name}</h3>
                <Badge>active</Badge>
              </div>
              <p className="mb-4 text-sm text-muted">{item.description}</p>
              <a href={`/founder?company=${item.slug}`} className="text-[13px] text-cyan">
                open dashboard →
              </a>
            </Card>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
