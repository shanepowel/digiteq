import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { PageHeader, PortalShell } from "@/components/portal-shell";
import { SearchPanel } from "@/components/search-panel";

export const metadata = { title: "Portfolio search" };

export default async function SearchPage() {
  const gate = await requireRole(["INTERNAL"]);
  if (!gate.ok) redirect("/login");

  return (
    <PortalShell role={gate.session.role} activeHref="/search">
      <PageHeader
        kicker="portfolio search"
        title="Search the group."
        description="Keyword search across companies, insights, ventures and pipeline deals. Optional AI summary when configured."
      />
      <SearchPanel />
    </PortalShell>
  );
}
