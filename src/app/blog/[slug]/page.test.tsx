import { describe, it, expect, vi } from 'vitest';
import { generateStaticParams, generateMetadata } from './page';

// Mock the blog data layer
vi.mock('@/lib/blog', () => ({
  getMdxSlugs: vi.fn().mockReturnValue(['test-slug-1', 'test-slug-2']),
  getMdxPostBySlug: vi.fn((slug) => {
    if (slug === 'private-post') {
      return {
        meta: {
          title: 'Private Post',
          description: 'A private post',
          date: '2026-05-29',
          private: true,
        }
      };
    }
    if (slug === 'public-post') {
      return {
        meta: {
          title: 'Public Post',
          description: 'A public post',
          date: '2026-05-29',
          private: false,
        }
      };
    }
    return null;
  }),
}));

// Mock metadata builder
vi.mock('@/lib/metadata', () => ({
  buildBlogMetadata: vi.fn().mockImplementation((meta) => ({ ...meta })),
  siteConfig: { url: 'http://localhost' },
}));

describe('BlogPost Dynamic Page', () => {
  describe('generateStaticParams', () => {
    it('maps slugs to the params shape expected by Next.js', async () => {
      const params = await generateStaticParams();
      expect(params).toEqual([
        { slug: 'test-slug-1' },
        { slug: 'test-slug-2' },
      ]);
    });
  });

  describe('generateMetadata', () => {
    it('adds noindex, nofollow robots tag for private posts', async () => {
      const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'private-post' }) });
      expect(metadata.robots).toEqual({
        index: false,
        follow: false,
      });
    });

    it('does not add robots tag for public posts', async () => {
      const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'public-post' }) });
      expect(metadata.robots).toBeUndefined();
    });

    it('returns empty object if post is not found', async () => {
      const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'non-existent' }) });
      expect(metadata).toEqual({});
    });
  });
});
