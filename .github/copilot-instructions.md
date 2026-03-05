# Copilot Instructions

## Overview

A Next.js portfolio project showcasing GitHub repos, experience, and skills. The project should be performant, SEO-friendly, and easy to maintain. It will use server components for data fetching and rendering, with a clean separation of concerns between UI components and data logic.

## Commands

- Dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Production start: `npm run start`

## Core Interactions Guidelines

- **Expert Persona**: Treat me as an expert developer familiar with Next.js, React, and web development best practices. Provide concise, relevant code snippets and explanations without over-simplifying or over-explaining basic concepts.
- **Answer Strategy**: Give answer immediately (code first), then explain reasoning and approach after. This helps ensure the most relevant information is seen first.
- **Code Style**: Follow existing code style and patterns for consistency. Use provided linting and formatting commands to maintain code quality.
- **Content Updates**: When updating content JSON files, maintain formatting and ordering for readability and to minimize diff noise. Use stable IDs for items to avoid breaking references.
- **Formatting**: When generating code, ensure it is properly formatted and adheres to the project's style guidelines. Use the existing code as a reference for formatting decisions.

## Tests

- No automated test suite is configured yet. When asked to verify changes, use `npm run lint` and `npm run build` as the default checks.

## Deployment

- README assumes Vercel deployment; set `SITE_URL` or `NEXT_PUBLIC_SITE_URL` so sitemap and metadata use the correct canonical base URL.
- Optional: set `GITHUB_TOKEN` in production to avoid GitHub API rate limits for the Projects page.

## When to use skills

- Consult agent skills in `.github/skills/` when a task mentions performance, Next.js patterns, or other specialized guidance covered by those skills.
- If a relevant skill exists, follow its instructions before making code changes.

### Available skills:

Use these specific skills for the corresponding scenarios:

- **vercel-react-best-practice**: For any React/Next.js code changes, especially related to performance optimizations.
- **conventional-commits**: When writing Git commit messages for any changes to the codebase, to ensure clear and consistent commit history.

**Notes**: Invoke skills by mentioning their trigger phrases (e.g., "Follow the vercel-react-best-practices for this component") in your instructions to ensure the agent applies the relevant guidelines.

## Architecture overview

- Next.js App Router lives in `src/app` with `layout.tsx`, route pages (`/`, `/about`, `/projects`), plus `robots.ts` and `sitemap.ts` wired to `siteConfig`.
- Content is stored as JSON in `/content` (profile, skills, experience, featured repos) and loaded directly in server components; types live in `src/lib/types.ts`.
- GitHub data fetching is centralized in `src/lib/github.ts`: it reads `content/featured-repos.json`, fetches repo details (optional `GITHUB_TOKEN`), and server components pass results to client components for sorting/filtering.
- UI split: `src/components/ui` contains shadcn-style primitives; `src/components/site` contains page-level sections (Header/Footer/ProjectCard/etc.).

## Repo conventions

- Use the `@/*` path alias (from `tsconfig.json`) for imports.
- Page metadata should use `defaultMetadata`/`buildPageMetadata` from `src/lib/seo.ts`.
- For ISR, export `revalidate` using `revalidateSeconds` from `src/lib/config.ts`.
- Theme handling: `layout.tsx` injects a script to set initial theme; `ThemeToggle` toggles the `dark` class and `localStorage` key `theme`.
- Tailwind styling uses the `cn` helper from `src/lib/utils.ts` (clsx + tailwind-merge) and design tokens defined in `src/app/globals.css`.

## Development guidelines

- For GitHub API interactions, use `src/lib/github.ts` and its exported functions; avoid direct API calls in components.
- When adding new content, create a new JSON file in `content/` and define a corresponding TypeScript type in `src/lib/types.ts`.
- Content conventions: use kebab-case filenames, keep item IDs stable, use consistent ordering within arrays, and keep JSON formatting tidy and deterministic.
- For new UI components, add them to `src/components/site` if they are page-specific, or `src/components/ui` if they are reusable primitives.
- Follow existing code style and patterns for consistency; use the provided linting and formatting commands to maintain code quality.

## Git

- Follow the conventional commit format for commit messages, refers to https://www.conventionalcommits.org/en/v1.0.0/ for details.
- Use feature branches for new work and open pull requests against `main` for review and merging.
