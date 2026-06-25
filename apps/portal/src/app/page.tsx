import Link from "next/link";
import { redirect } from "next/navigation";
import { PortalAuthHeader } from "@/components/portal-auth-header";
import { defaultRouteForRole, getSessionUser } from "@/lib/auth";
import { Card, PageHeader } from "@/components/portal-shell";
import { marketingUrl } from "@/lib/utils";

export default async function PortalHomePage() {
  const session = await getSessionUser();

  if (session) {
    redirect(defaultRouteForRole(session.role));
  }

  return (
    <div className="min-h-screen px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-[640px]">
        <PortalAuthHeader />
        <PageHeader
          kicker="operating platform"
          title="Digiteq portal."
          description="Authenticated access for internal team, portfolio founders and investors."
        />
        <div className="grid gap-4">
          <Card>
            <h2 className="mb-2 text-[15px] font-semibold text-white">sign in</h2>
            <p className="mb-4 text-sm text-muted">
              Use your Digiteq, BMKRS or FreelanceNearMe account when SSO is configured.
            </p>
            <Link
              href="/login"
              className="inline-flex rounded-[10px] bg-gradient-to-br from-[#00D4FF] to-[#8B5CF6] px-5 py-2.5 text-sm font-medium text-white"
            >
              go to login
            </Link>
          </Card>
          <Card>
            <p className="text-sm text-muted">
              Public site:{" "}
              <Link href={marketingUrl} className="text-cyan hover:underline">
                digiteq.io
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
