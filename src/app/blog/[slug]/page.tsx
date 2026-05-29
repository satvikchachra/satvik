import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMdxPostBySlug, getMdxSlugs } from "@/lib/blog";
import { buildBlogMetadata } from "@/lib/metadata";
import { PostLayout } from "@/components/blog/post-layout";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getMdxSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getMdxPostBySlug(slug);
  if (!post) return {};

  const meta = buildBlogMetadata({
    title: post.meta.title,
    description: post.meta.description,
    slug,
    date: post.meta.date,
    tags: post.meta.tags,
    ogImage: post.meta.ogImage,
  });

  if (post.meta.private) {
    meta.robots = {
      index: false,
      follow: false,
    };
  }

  return meta;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getMdxPostBySlug(slug);

  if (!post) notFound();

  // Dynamically import the MDX file
  // @next/mdx handles compilation at build time via next.config
  const { default: MDXContent } = await import(
    `@/content/blog/${post.meta.filename}.mdx`
  ).catch(() => {
    notFound();
  }) as { default: React.ComponentType };

  return (
    <PostLayout
      title={post.meta.title}
      description={post.meta.description}
      date={post.meta.date}
      readingTime={post.meta.readingTime}
      image={post.meta.image}
    >
      <MDXContent />
    </PostLayout>
  );
}
