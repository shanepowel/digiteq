import { ContentPage } from "@/components/content-page";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { pillars } from "@/data/site";
import { getSanityClient } from "@/lib/sanity/client";
import { TEAM_QUERY } from "@/lib/sanity/queries";
import type { TeamMember } from "@/lib/sanity/types";

export const metadata = { title: "About" };

export default async function AboutPage() {
  let team: TeamMember[] = [];
  try {
    team = await getSanityClient().fetch<TeamMember[]>(TEAM_QUERY);
  } catch {
    team = [];
  }

  return (
    <ContentPage page="about">
      <section className="px-6 pb-24 sm:px-12">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <Card key={pillar.title}>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{pillar.body}</p>
              </Card>
            ))}
          </div>
          {team.length > 0 && (
            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <Card key={member._id}>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  {member.role && <p className="text-sm text-cyan">{member.role}</p>}
                  {member.bio && <p className="mt-2 text-sm text-muted">{member.bio}</p>}
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>
    </ContentPage>
  );
}
