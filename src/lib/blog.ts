import fs from "fs";
import path from "path";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

export interface MdxPost {
  slug: string;
  filename: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  image: string;
  ogImage: string;
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
  image: string;
  ogImage: string;
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
function getMdxPostMeta(jsonPath: string): {
  slug?: string;
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  image?: string;
  ogImage?: string;
} {
  if (fs.existsSync(jsonPath)) {
    try {
      return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    } catch {
      // malformed JSON — use defaults
    }
  }
  return {};
}

function getMdxPosts(): MdxPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  return files.map((filenameWithExt) => {
    const filename = filenameWithExt.replace(/\.mdx$/, "");
    const mdxPath = path.join(CONTENT_DIR, filenameWithExt);
    const jsonPath = path.join(CONTENT_DIR, `${filename}.json`);

    const body = fs.readFileSync(mdxPath, "utf-8");
    const rt = readingTime(body);

    const meta = getMdxPostMeta(jsonPath);
    const slug = meta.slug || filename;

    if (!meta.image || !meta.ogImage) {
      throw new Error(`Blog post "${slug}" (file: ${filename}) is missing mandatory 'image' or 'ogImage' properties in its JSON metadata.`);
    }

    return {
      slug,
      filename,
      title: meta.title ?? slug,
      description: meta.description ?? "",
      date: meta.date ?? new Date().toISOString().split("T")[0],
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      readingTime: rt.text,
      image: meta.image,
      ogImage: meta.ogImage,
      type: "mdx" as const,
    };
  });
}

export function getAllPosts(): Post[] {
  const mdx = getMdxPosts();
  const all = [...mdx, ...CUSTOM_POSTS];
  return all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getMdxPostBySlug(slug: string): { meta: MdxPost; content: string } | null {
  const posts = getMdxPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  const mdxPath = path.join(CONTENT_DIR, `${post.filename}.mdx`);
  const body = fs.readFileSync(mdxPath, "utf-8");

  return {
    meta: post,
    content: body,
  };
}

export function getMdxSlugs(): string[] {
  return getMdxPosts().map((p) => p.slug);
}

export function getAllBlogTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((p) => {
    p.tags.forEach((t) => tags.add(t));
  });
  return Array.from(tags).sort();
}

