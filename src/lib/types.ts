export type Repo = {
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  topics?: string[];
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
  highlights: string[];
  skillsSummary: string[];
  tools: string[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export type SkillsContent = {
  categories: SkillCategory[];
  tools: string[];
};
