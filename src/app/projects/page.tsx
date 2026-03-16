import type { Metadata } from "next";

import { Container } from "@/components/site/Container";
import { ProjectListClient } from "@/components/site/ProjectListClient";
import { Separator } from "@/components/ui/separator";
import { getFeaturedRepos } from "@/lib/github";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 86400;

export const metadata: Metadata = buildPageMetadata({
  title: "Projects",
  description:
    "Featured projects with GitHub stats, demos, and recent updates.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const { repos, hadError } = await getFeaturedRepos();

  return (
    <div className="space-y-10 pb-20 pt-16">
      <Container className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold">Projects</h1>
          <p className="text-muted-foreground">
            Highlighted projects from my GitHub.
          </p>
        </div>
        <Separator />
        {hadError ? (
          <p className="text-sm text-muted-foreground">
            Project data temporarily unavailable.
          </p>
        ) : null}
        {repos.length ? (
          <ProjectListClient repos={repos} />
        ) : (
          <p className="text-sm text-muted-foreground">
            No projects to display at the moment.
          </p>
        )}
      </Container>
    </div>
  );
}
