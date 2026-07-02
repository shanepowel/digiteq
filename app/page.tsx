import { RegisterShell } from "@/components/layout/register-shell";
import { HomeEcosystem } from "@/components/home/home-ecosystem";
import { EquityRegister } from "@/components/home/equity-register";
import { HomeHero } from "@/components/home/home-hero";
import { HomeInsights } from "@/components/home/home-insights";
import { HomePhilosophy } from "@/components/home/home-philosophy";
import { HomeVault } from "@/components/home/home-vault";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";
import { mapCompaniesToRegister } from "@/lib/home/register";
import { getSanityClient } from "@/lib/sanity/client";
import { INSIGHTS_QUERY, REGISTER_QUERY } from "@/lib/sanity/queries";
import type { Company, Insight } from "@/lib/sanity/types";

export const metadata = buildMetadata(pageMetadata.home);

export default async function HomePage() {
  let companies: Company[] = [];
  let insights: Insight[] = [];

  try {
    companies = await getSanityClient().fetch<Company[]>(REGISTER_QUERY);
    insights = await getSanityClient().fetch<Insight[]>(INSIGHTS_QUERY);
  } catch {
    companies = [];
    insights = [];
  }

  const registerRows = mapCompaniesToRegister(companies);

  return (
    <RegisterShell>
      <HomeHero holdingsCount={registerRows.length} />
      <HomeEcosystem />
      <HomePhilosophy />
      <EquityRegister rows={registerRows} />
      <HomeVault />
      <HomeInsights insights={insights} />
    </RegisterShell>
  );
}
