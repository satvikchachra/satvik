import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getMdxPostBySlug, getMdxSlugs } from '@/lib/blog';
import { buildBlogMetadata, siteConfig } from '@/lib/metadata';
import { PostLayout } from '@/components/blog/post-layout';

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
  let MDXModule;
  try {
    MDXModule = await import(`@/content/blog/${post.meta.filename}.mdx`);
  } catch {
    notFound();
  }
  const { default: MDXContent } = MDXModule as { default: React.ComponentType };

  const url = `${siteConfig.url}/blog/${slug}`;
  const images = post.meta.ogImage ? [new URL(post.meta.ogImage, siteConfig.url).toString()] : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.meta.title,
    image: images,
    datePublished: new Date(post.meta.date).toISOString(),
    dateModified: new Date(post.meta.date).toISOString(),
    author: [
      {
        '@type': 'Person',
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    description: post.meta.description,
    isAccessibleForFree: true,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostLayout
        title={post.meta.title}
        description={post.meta.description}
        date={post.meta.date}
        readingTime={post.meta.readingTime}
        image={post.meta.image}
      >
        <MDXContent />
      </PostLayout>
    </>
  );
}
