import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Repo } from "@/lib/types";

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatUpdatedAt(updatedAt: string) {
  const date = new Date(updatedAt);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return formatter.format(date);
}

type ProjectCardProps = {
  repo: Repo;
};

export function ProjectCard({ repo }: ProjectCardProps) {
  console.log(repo);
  const lastUpdated = formatUpdatedAt(repo.pushed_at || repo.updated_at);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="mt-3">{repo.name}</CardTitle>{" "}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-3 text-muted-foreground">
            <span>{repo.stargazers_count} stars</span>
            <span>{repo.forks_count} forks</span>
            {lastUpdated ? <span>Updated {lastUpdated}</span> : null}
          </div>
          <div className="flex items-center gap-3">
            <a
              className="text-sm font-semibold text-primary"
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
            >
              View repo
            </a>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 text-sm text-muted-foreground">
        <div>{repo.description || "No description provided yet."}</div>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{repo.language}</Badge>
          {repo.topics?.map((topic) => (
            <Badge key={topic} className="bg-transparent text-muted-foreground">
              {topic}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
