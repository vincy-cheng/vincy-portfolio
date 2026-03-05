"use client";

import * as React from "react";

import type { Repo } from "@/lib/types";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOptions = [
  { value: "updated", label: "Recently updated" },
  { value: "stars", label: "Most starred" },
] as const;

type SortKey = (typeof sortOptions)[number]["value"];

type ProjectListClientProps = {
  repos: Repo[];
};

export function ProjectListClient({ repos }: ProjectListClientProps) {
  const [sortBy, setSortBy] = React.useState<SortKey>("updated");
  const [language, setLanguage] = React.useState<string>("all");

  const languages = React.useMemo(() => {
    const set = new Set(repos.map((repo) => repo.language).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [repos]);

  const filtered = React.useMemo(() => {
    const base =
      language === "all"
        ? repos
        : repos.filter((repo) => repo.language === language);

    return [...base].sort((a, b) => {
      if (sortBy === "stars") {
        return b.stargazers_count - a.stargazers_count;
      }
      const bTime = new Date(b.pushed_at || b.updated_at).getTime();
      const aTime = new Date(a.pushed_at || a.updated_at).getTime();
      const safeB = Number.isNaN(bTime) ? 0 : bTime;
      const safeA = Number.isNaN(aTime) ? 0 : aTime;
      return safeB - safeA;
    });
  }, [repos, language, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          Sort
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
            <SelectTrigger className="h-auto rounded-full border-border/60 bg-background py-1 pl-3 pr-2.5 text-sm text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          Language
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="h-auto rounded-full border-border/60 bg-background py-1 pl-3 pr-2.5 text-sm text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang === "all" ? "All" : lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Badge className="bg-transparent text-muted-foreground">
          {filtered.length} projects
        </Badge>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((repo) => (
          <ProjectCard key={repo.html_url} repo={repo} />
        ))}
      </div>
    </div>
  );
}
