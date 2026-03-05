import type { Metadata } from "next";

import experienceContent from "../../../content/experience.json";
import profileContent from "../../../content/profile.json";
import skillsContent from "../../../content/skills.json";
import { Container } from "@/components/site/Container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { buildPageMetadata } from "@/lib/seo";
import type { ExperienceEntry, Profile, SkillsContent } from "@/lib/types";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "Background, experience, and the work philosophy behind my projects.",
  path: "/about",
});

const profile = profileContent as Profile;
const experience = experienceContent as ExperienceEntry[];
const skills = skillsContent as SkillsContent;

export default function AboutPage() {
  return (
    <div className="space-y-12 pb-20 pt-16">
      <Container className="space-y-10">
        <div className="space-y-4">
          <Badge className="w-fit bg-transparent text-muted-foreground">
            About
          </Badge>
          <h1 className="text-3xl font-semibold">{profile.name}</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {profile.tagline}
          </p>
        </div>
        <Separator />
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Myself</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <ul className="mt-4 space-y-3 text-base">
                {profile.highlights.map((item) => (
                  <li key={item} className="text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tools & stack</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {skills.tools.map((tool) => (
                <Badge key={tool}>{tool}</Badge>
              ))}
            </CardContent>
          </Card>
        </section>
      </Container>

      <Container className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Experience</h2>
          <p className="text-muted-foreground">
            Recent roles and the impact delivered along the way.
          </p>
        </div>
        <div className="grid gap-6">
          {experience.map((role) => (
            <Card key={`${role.company}-${role.start}`}>
              <CardHeader>
                <CardTitle className="flex flex-wrap items-center justify-between gap-2">
                  <span>{role.company}</span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {role.start} - {role.end}
                  </span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{role.role}</p>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>{role.summary}</p>
                <ul className="grid gap-2">
                  {role.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>

      <Container className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <p className="text-muted-foreground">
            Overview of my technical skills, tools, and platforms I used to work
            with and experience in.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {skills.categories.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {category.items.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
