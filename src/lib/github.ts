import featuredRepos from "../../content/featured-repos.json";
import type { Repo } from "@/lib/types";
import { revalidateSeconds } from "@/lib/config";

type GitHubRepoResponse = {
  name?: string;
  description?: string | null;
  html_url?: string;
  homepage?: string | null;
  language?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  updated_at?: string | null;
  pushed_at?: string | null;
  topics?: string[];
};

const githubApiBase = "https://api.github.com/repos";

function normalizeRepo(data: GitHubRepoResponse): Repo {
  return {
    name: data.name ?? "",
    description: data.description ?? "",
    html_url: data.html_url ?? "",
    homepage: data.homepage ?? "",
    language: data.language ?? "Unknown",
    stargazers_count: data.stargazers_count ?? 0,
    forks_count: data.forks_count ?? 0,
    updated_at: data.updated_at ?? "",
    pushed_at: data.pushed_at ?? "",
    topics: Array.isArray(data.topics) ? data.topics : [],
  };
}

async function fetchRepo(slug: string) {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`${githubApiBase}/${slug}`, {
    headers,
    next: { revalidate: revalidateSeconds },
  });

  if (response.status === 404) {
    console.warn(`[github] repo not found: ${slug}`);
    return { repo: null, error: false };
  }

  if (!response.ok) {
    throw new Error(`GitHub API error ${response.status} for ${slug}`);
  }

  const data = (await response.json()) as GitHubRepoResponse;
  return { repo: normalizeRepo(data), error: false };
}

export async function getFeaturedRepos() {
  let hadError = false;

  const results = await Promise.all(
    featuredRepos.map(async (slug) => {
      try {
        const { repo } = await fetchRepo(slug);
        return repo;
      } catch (error) {
        hadError = true;
        console.warn(`[github] failed to fetch ${slug}`, error);
        return null;
      }
    }),
  );

  return {
    repos: results.filter((repo): repo is Repo => Boolean(repo)),
    hadError,
  };
}
