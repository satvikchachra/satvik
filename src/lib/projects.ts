export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: "active" | "archived" | "wip";
  year: number;
}

export const PROJECTS: Project[] = [
  {
    slug: "ai-coding-agent",
    title: "AI Coding Agent",
    description:
      "An agentic system that reads, edits, and reasons about codebases autonomously. Built with tool-use loops, context management, and multi-step planning.",
    tags: ["AI Agents", "Python", "LLM", "TypeScript"],
    githubUrl: "https://github.com/satvikchachra",
    liveUrl: undefined,
    featured: true,
    status: "active",
    year: 2025,
  },
  {
    slug: "developer-tooling-platform",
    title: "Developer Tooling Platform",
    description:
      "Platform infrastructure for AI-native developer tools — sandboxing, code execution, language servers, and real-time collaboration.",
    tags: ["Platform Engineering", "Docker", "WebSockets", "Go"],
    githubUrl: "https://github.com/satvikchachra",
    liveUrl: undefined,
    featured: true,
    status: "active",
    year: 2025,
  },
  {
    slug: "intelligent-code-review",
    title: "Intelligent Code Review",
    description:
      "LLM-powered code review system that understands intent, not just syntax — catching logic errors, design smells, and security issues.",
    tags: ["AI", "Code Analysis", "Python", "RAG"],
    githubUrl: "https://github.com/satvikchachra",
    liveUrl: undefined,
    featured: true,
    status: "active",
    year: 2024,
  },
  {
    slug: "llm-observability",
    title: "LLM Observability Toolkit",
    description:
      "Structured tracing, token usage analytics, and latency profiling for LLM applications in production.",
    tags: ["Observability", "OpenTelemetry", "Python", "Dashboards"],
    githubUrl: "https://github.com/satvikchachra",
    liveUrl: undefined,
    featured: false,
    status: "active",
    year: 2024,
  },
  {
    slug: "context-engine",
    title: "Context Engine",
    description:
      "A RAG + semantic search engine designed for code-first retrieval — understanding function signatures, types, and call graphs.",
    tags: ["RAG", "Embeddings", "TypeScript", "Postgres"],
    githubUrl: "https://github.com/satvikchachra",
    liveUrl: undefined,
    featured: false,
    status: "wip",
    year: 2025,
  },
  {
    slug: "prompt-engineering-studio",
    title: "Prompt Engineering Studio",
    description:
      "Visual IDE for iterating on prompts with version control, A/B eval, and structured output validation.",
    tags: ["LLM", "React", "Python", "Evaluation"],
    githubUrl: "https://github.com/satvikchachra",
    liveUrl: undefined,
    featured: false,
    status: "archived",
    year: 2023,
  },
];

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
