import type { Metadata } from 'next';
import { buildMetadata, siteConfig } from '@/lib/metadata';
import { getAllPosts } from '@/lib/blog';
import { BlogList } from '@/components/blog/blog-list';
import { DevPrivateToggle } from '@/components/blog/dev-private-toggle';
import { BLOG_CONTENT } from '@/lib/content';

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description: BLOG_CONTENT.heroSubtitle,
  path: '/blog',
});

export default function BlogPage() {
  const posts = getAllPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteConfig.url}/blog`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-xl mx-auto px-6 pt-28 pb-12">
        {/* Header */}
        <header className="mb-12 animate-fade-in-up stagger-0">
          <h1 id="blog-heading" className="text-lg tracking-tight mb-2 text-text">
            {BLOG_CONTENT.heroTitle}
          </h1>
          <p className="text-sm leading-relaxed text-text-muted">{BLOG_CONTENT.heroSubtitle}</p>
        </header>

        {posts.length === 0 ? (
          <div className="py-16 animate-fade-in-up stagger-1 border-t border-border-subtle">
            <p className="text-sm mb-1 text-text">{BLOG_CONTENT.noPostsFound}</p>
            <p className="text-sm text-text-muted">{BLOG_CONTENT.dropInSoon}</p>
          </div>
        ) : (
          <div className="animate-fade-in-up stagger-1">
            <DevPrivateToggle>
              <BlogList posts={posts} />
            </DevPrivateToggle>
          </div>
        )}
      </div>
    </>
  );
}
