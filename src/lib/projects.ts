import { PROJECTS_DATA } from './content';

export interface Project {
  slug: string;
  title: string;
  company?: string;
  description: string;
  bullets: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: 'active' | 'archived' | 'wip';
  year: number;
}

export const PROJECTS: Project[] = PROJECTS_DATA;

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getAllTags(): string[] {
  const tags = PROJECTS.flatMap((p) => p.tags);
  return [...new Set(tags)].sort();
}
