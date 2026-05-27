import fs from "fs";
import path from "path";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

export interface MdxPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  type: "mdx";
}

// Custom posts are hand-registered here (for creatively designed pages)
export interface CustomPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime?: string;
  type: "custom";
  // path inside /app/blog/ — Next.js handles routing automatically
}

export type Post = MdxPost | CustomPost;

// ----------------------------------------------------------------
// CUSTOM POST REGISTRY
// Add an entry here when you create a custom blog post page at
// /app/blog/<slug>/page.tsx
// ----------------------------------------------------------------
export const CUSTOM_POSTS: CustomPost[] = [
  // Example (uncomment and edit when you add a custom post):
  // {
  //   slug: "building-an-ai-agent",
  //   title: "Building an AI Coding Agent from Scratch",
  //   description: "A visual deep-dive into how I architected a full agentic loop.",
  //   date: "2025-03-10",
  //   tags: ["AI", "Agents", "Engineering"],
  //   readingTime: "15 min read",
  //   type: "custom",
  // },
];

// ----------------------------------------------------------------
// MDX POST READER
// Reads metadata from a sidecar .json file next to the .mdx file.
// This avoids the frontmatter being rendered as content when Next.js
// dynamically imports the compiled MDX.
// ----------------------------------------------------------------
function getMdxPosts(): MdxPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const mdxPath = path.join(CONTENT_DIR, filename);
    const jsonPath = path.join(CONTENT_DIR, `${slug}.json`);

    // Read the MDX body for reading-time calculation
    const body = fs.readFileSync(mdxPath, "utf-8");
    const rt = readingTime(body);

    // Read metadata from sidecar JSON (preferred) or fall back to filename
    let meta: {
      title?: string;
      description?: string;
      date?: string;
      tags?: string[];
    } = {};
    if (fs.existsSync(jsonPath)) {
      try {
        meta = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
      } catch {
        // malformed JSON — use defaults
      }
    }

    return {
      slug,
      title: meta.title ?? slug,
      description: meta.description ?? "",
      date: meta.date ?? new Date().toISOString().split("T")[0],
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      readingTime: rt.text,
      type: "mdx" as const,
    };
  });
}

// ----------------------------------------------------------------
// COMBINED API
// ----------------------------------------------------------------
export function getAllPosts(): Post[] {
  const mdx = getMdxPosts();
  const all = [...mdx, ...CUSTOM_POSTS];
  return all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getMdxPostBySlug(slug: string): { meta: MdxPost; content: string } | null {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(mdxPath)) return null;

  const jsonPath = path.join(CONTENT_DIR, `${slug}.json`);
  const body = fs.readFileSync(mdxPath, "utf-8");
  const rt = readingTime(body);

  let meta: {
    title?: string;
    description?: string;
    date?: string;
    tags?: string[];
  } = {};
  if (fs.existsSync(jsonPath)) {
    try {
      meta = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    } catch {
      // ignore
    }
  }

  return {
    meta: {
      slug,
      title: meta.title ?? slug,
      description: meta.description ?? "",
      date: meta.date ?? new Date().toISOString().split("T")[0],
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      readingTime: rt.text,
      type: "mdx" as const,
    },
    content: body,
  };
}

export function getMdxSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllBlogTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((p) => {
    p.tags.forEach((t) => tags.add(t));
  });
  return Array.from(tags).sort();
}

// Format date for display
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
