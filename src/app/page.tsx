import Link from "next/link";

import profileContent from "../../content/profile.json";
import skillsContent from "../../content/skills.json";
import { Container } from "@/components/site/Container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { revalidateSeconds } from "@/lib/config";
import type { Profile, SkillsContent } from "@/lib/types";

export const revalidate = revalidateSeconds;

const profile = profileContent as Profile;
const skills = skillsContent as SkillsContent;

export default async function Home() {
  return (
    <div className="space-y-20 pb-20">
      <section className="pt-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-6 md:pl-4">
            <div className="text-xl font-semibold tracking-tight md:text-4xl space-y-6">
              {profile.name}
              <span className="block text-muted-foreground md:text-xl">
                {profile.role}
              </span>
            </div>
            <p className="text-lg text-muted-foreground md:text-xl">
              {profile.tagline}
            </p>
          </div>
          <div className="rounded-4xl border border-border/70 bg-card/70 p-8 shadow-lg shadow-primary/10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              NICE TO MEET YOU 😬
            </h2>
            <div className="mt-4 text-base space-y-3">
              <p>Hi, I'm {profile.name}. This is my personal page :)</p>
              <p>
                Currently based in {profile.location}, focused on building
                dependable, automated digital products. This is used to display
                my project and work experience. Feel free to visit my GitHub and
                LinkedIn.
              </p>
            </div>

            <Separator className="my-6" />
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Skills Snapshot
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skillsSummary.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
