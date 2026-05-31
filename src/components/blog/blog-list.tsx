import Link from 'next/link';
import type { Post } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { BLOG_CONTENT } from '@/lib/content';

interface BlogListProps {
  posts: Post[];
}

export function BlogList({ posts }: BlogListProps) {
  return posts.length === 0 ? (
    <div className="py-16 border-t border-border-subtle">
      <p className="text-sm mb-1 text-text">{BLOG_CONTENT.noPostsFoundFallback}</p>
    </div>
  ) : (
    <ol aria-label="Blog posts">
      {posts.map((post, i) => (
        <li key={post.slug} data-private={post.private ? 'true' : undefined}>
          <Link
            href={`/blog/${post.slug}`}
            id={`blog-post-${post.slug}`}
            className="row-link group flex-col sm:flex-row items-start sm:items-start!"
            style={{
              animationDelay: `${(i + 1) * 50}ms`,
            }}
          >
            <div className="w-full sm:flex-1 min-w-0 pr-0 sm:pr-8 mb-2 sm:mb-0">
              <span className="text-sm block mb-1 text-text leading-snug">
                <span className="animated-underline">{post.title}</span>
                {post.private && (
                  <span className="inline-flex align-middle text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-accent/10 text-accent border border-accent/20 ml-2">
                    Private
                  </span>
                )}
                <span className="row-link-arrow text-xs ml-1.5 inline-block text-accent!">→</span>
              </span>
              {post.description && (
                <span className="text-xs leading-relaxed block text-text-subtle">
                  {post.description}
                </span>
              )}
            </div>
            <div className="w-full sm:w-auto flex items-center gap-2 flex-shrink-0 pt-1 sm:pt-0.5">
              <time dateTime={post.date} className="mono-label">
                {formatDate(post.date)}
              </time>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
