import "./home.css";
import { HomeEcosystem } from "@/components/home/home-ecosystem";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeHero } from "@/components/home/home-hero";
import { HomeInsights } from "@/components/home/home-insights";
import { HomeNav } from "@/components/home/home-nav";
import { HomePhilosophy } from "@/components/home/home-philosophy";
import { HomeVault } from "@/components/home/home-vault";
import { HomeSvgDefs } from "@/components/home/home-svg";
import { EquityRegister } from "@/components/home/equity-register";
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
    <div className="digiteq-home min-h-screen">
      <div className="dh-grain" aria-hidden="true" />
      <HomeSvgDefs />
      <HomeNav />
      <main>
        <HomeHero holdingsCount={registerRows.length} />
        <HomeEcosystem />
        <HomePhilosophy />
        <EquityRegister rows={registerRows} />
        <HomeVault />
        <HomeInsights insights={insights} />
      </main>
      <HomeFooter />
    </div>
  );
}
