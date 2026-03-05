# Personal Page (Static) — Spec v1.1 (Next.js 16 + shadcn/ui)

**Repository:** `Vincy-Cheng/vincy-portfolio`  
**Owner:** `Vincy-Cheng`  
**Date:** `2026-03-03`  
**Goal:** Build a fast, static personal website that showcases profile info and projects, including selected data pulled from GitHub, with no database.

---

## 1. Objectives

### 1.1 Primary

- Provide a clean personal landing page (intro, links, highlights).
- Display projects with metadata sourced from GitHub.
- Keep hosting simple and low-cost/free.
- Avoid a traditional database.

### 1.2 Non-goals

- No user accounts/auth flows.
- No CMS/admin panel.
- No complex backend; server code only for safe GitHub API access.
- No heavy analytics (optional lightweight analytics is acceptable).
- No “HTML/CSS tricks”, “tips & tricks”, snippets/tutorial sections.

---

## 2. Tech Stack (Pinned)

### 2.1 Framework

- **Next.js 16**
- **React + TypeScript**
- **App Router** (`src/app`)
- Prefer **React Server Components** by default; Client Components only when needed.

### 2.2 Styling / UI

- **Tailwind CSS**
- **shadcn/ui** (components generated into repo)
- Radix UI primitives (through shadcn/ui)
- `cn()` utility per shadcn convention

### 2.3 Theme

- Light/dark mode supported.
- Use shadcn-compatible CSS variable tokens in `globals.css`.
- Default to the user system setting (`prefers-color-scheme`) on first load.
- Provide a user-controlled theme toggle in the global Header.
- Persist user selection across sessions.
- Use class-based theme switching on `html` (e.g., `dark` class).

### 2.4 Data Fetching

- GitHub API fetched server-side for static/ISR rendering.

### 2.5 Deployment (Pinned)

- **Primary and required for v1: Vercel**
- Other hosts are out of scope for v1.

---

## 3. Rendering, Caching & Data Strategy (Vercel)

### 3.1 Rendering mode

- **ISR enabled** with revalidation every **86400 seconds (24h)**.
- Site remains static for users; data refreshes in background on revalidation.

### 3.2 GitHub repo selection strategy

- **Strategy A (required for v1): Curated list**
  - Maintain curated repo names in `content/featured-repos.json`.
  - Fetch details for each curated repo from GitHub API.

### 3.3 Token handling

- `GITHUB_TOKEN` stored in **Vercel Environment Variables**.
- Never exposed in browser bundle.
- If token is absent, app must still build and run with unauthenticated requests (best effort), with possible rate limiting.

### 3.4 Vercel caching behavior requirements

- Use route/page-level ISR (`revalidate = 86400`) for pages that render GitHub data.
- Use fetch-level caching (`next: { revalidate: 86400 }`) in GitHub data helpers.
- Expected runtime behavior:
  1. Cached page served for normal traffic.
  2. After revalidation window, stale page may be served while background regeneration runs.
  3. On successful regeneration, new cache replaces old content.
- This caching model must reduce GitHub API calls and improve performance.

### 3.5 Failure & fallback behavior

If GitHub fetch fails:

1. Continue rendering with available cached/stale ISR output when possible.
2. If no cached data exists, render graceful empty state.
3. Show non-blocking message: “Project data temporarily unavailable.”
4. Build must not fail solely due to GitHub rate limits or single-repo fetch errors.

---

## 4. Functional Requirements

### 4.1 Routes

#### `/` Home

- Hero: name, role/title, short description.
- CTA links: GitHub, LinkedIn, Email.
- Highlights:
  - Featured projects (from curated GitHub repos)
  - Skills summary (static content)
- Header includes theme toggle (light/dark).
- Footer with links.

#### `/projects`

Project cards/list items must include:

- `name`
- `description`
- `primary language`
- `stars`
- `forks`
- `last updated`
- `repo link`
- optional `homepage/demo link`

Behavior:

- Default sort: **`updated_at desc`**.
- Optional sort toggle: `stars desc` / `updated_at desc`.
- Optional language filter is **client-side** over already fetched repos.

#### `/about`

Must include:

- Bio/summary
- Work experience (timeline or grouped entries)
- Skills (grouped categories)
- Tools/stack (short list)

Must exclude:

- Any HTML/CSS tricks, tips, tutorial-style sections.

## 5. GitHub Data Contract

### 5.1 Required fields per repo

- `name`
- `description`
- `html_url`
- `homepage` (optional)
- `language`
- `stargazers_count`
- `forks_count`
- `updated_at`
- `topics` (optional)

### 5.2 Data normalization rules

- Missing text fields -> fallback to empty string.
- Missing language -> display “Unknown”.
- Invalid/missing dates -> hide date badge instead of crashing.
- Curated repos returning 404 are skipped with warning log.

### 5.3 API credentials policy

- Public repo fetch **does not require credentials**.
- `GITHUB_TOKEN` is **recommended** for stability/rate limits.
- Token usage is server-only and never client-exposed.

---

## 6. Non-functional Requirements

### 6.1 Performance

Lighthouse target on Home:

- Performance >= 90
- Accessibility >= 90
- Best Practices >= 90
- SEO >= 90

### 6.2 Accessibility

- Keyboard navigable UI.
- Adequate contrast in light/dark.
- Semantic landmarks and heading order.

### 6.3 SEO

- Per-page metadata: title + description.
- OG + Twitter basic tags.
- Canonical URL per route.
- Default OG image fallback.
- `sitemap.xml` and `robots.txt`.

### 6.4 Security

- No secrets in `NEXT_PUBLIC_*`.
- GitHub token server-only.
- No client-side token leakage via props or serialized payloads.

### 6.5 Maintainability

- Content lives in `content/`.
- Reusable, small components.
- shadcn/ui components under `src/components/ui/`.

---

## 7. UI Component Requirements (shadcn/ui)

### 7.1 Required in v1

- `Button`
- `Card`
- `Badge`
- `Separator`

### 7.2 Optional

- `Tabs`
- `Accordion`
- `Avatar`
- `Sheet` / `DropdownMenu`

---

## 8. Content Model

Required:

- `content/profile.json`
- `content/featured-repos.json`
- `content/experience.json`
- `content/skills.json`

Do not create:

- tips/tricks/snippets/tutorial content files.

---

## 9. Proposed Project Structure

```text
/
  src/
    app/
      layout.tsx
      page.tsx
      projects/page.tsx
      about/page.tsx
    components/
      ui/
      site/
        Header.tsx
        Footer.tsx
        ProjectCard.tsx
        Container.tsx
    lib/
      github.ts
      config.ts
      types.ts
      seo.ts
  content/
    profile.json
    featured-repos.json
    experience.json
    skills.json
  public/
    og-default.png (recommended)
```

---

## 10. Acceptance Criteria (v1)

- Installs and builds on clean machine.
- Home renders profile + links + highlighted projects.
- About includes bio/experience/skills/tools and excludes tricks/tutorial content.
- Projects page renders at least **N=4** repos from curated list when available.
- Graceful fallback UI when GitHub data unavailable.
- No database used.
- Mobile + desktop responsive.
- `GITHUB_TOKEN` not present in client bundle.
- ISR/fetch revalidation set to **86400 seconds**.
- Deployed successfully on **Vercel** with env var support.
- SEO basics present (metadata, OG/Twitter, sitemap, robots, canonical).
