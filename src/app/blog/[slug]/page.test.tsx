import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BlogPostPage, { generateStaticParams, generateMetadata } from './page';
import { notFound } from 'next/navigation';

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
        },
      };
    }
    if (slug === 'public-post') {
      return {
        meta: {
          title: 'Public Post',
          description: 'A public post',
          date: '2026-05-29',
          private: false,
        },
      };
    }
    return null;
  }),
}));

// Mock metadata builder
vi.mock('@/lib/metadata', () => ({
  buildBlogMetadata: vi.fn().mockImplementation((meta) => ({ ...meta })),
  siteConfig: { url: 'https://test.com', name: 'Test Name' },
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

// Mock PostLayout
vi.mock('@/components/blog/post-layout', () => ({
  PostLayout: ({ children, title }: { children: React.ReactNode; title: string }) => (
    <div data-testid="post-layout" data-title={title}>
      {children}
    </div>
  ),
}));

// Mock MDX modules for dynamic import testing
vi.mock('@/content/blog/undefined.mdx', () => {
  throw new Error('MDX module not found');
});

vi.mock('@/content/blog/e2e-test-post.mdx', () => ({
  default: () => <div data-testid="mdx-content">MDX Content</div>,
}));

// Update the blog data layer mock to include filenames
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
          filename: 'private-post-file',
        },
      };
    }
    if (slug === 'public-post') {
      return {
        meta: {
          title: 'Public Post',
          description: 'A public post',
          date: '2026-05-29',
          private: false,
          filename: 'e2e-test-post',
          ogImage: '/og-image.jpg',
        },
      };
    }
    return null;
  }),
}));

describe('BlogPost Dynamic Page', () => {
  describe('generateStaticParams', () => {
    it('maps slugs to the params shape expected by Next.js', async () => {
      const params = await generateStaticParams();
      expect(params).toEqual([{ slug: 'test-slug-1' }, { slug: 'test-slug-2' }]);
    });
  });

  describe('generateMetadata', () => {
    it('adds noindex, nofollow robots tag for private posts', async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'private-post' }),
      });
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
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: 'non-existent' }),
      });
      expect(metadata).toEqual({});
    });
  });

  describe('BlogPostPage', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('calls notFound when post is not found', async () => {
      await expect(
        BlogPostPage({ params: Promise.resolve({ slug: 'non-existent' }) }),
      ).rejects.toThrow('NEXT_NOT_FOUND');
      expect(notFound).toHaveBeenCalled();
    });

    it('calls notFound when MDX file fails to import', async () => {
      await expect(
        BlogPostPage({ params: Promise.resolve({ slug: 'private-post' }) }),
      ).rejects.toThrow('NEXT_NOT_FOUND');
      expect(notFound).toHaveBeenCalled();
    });

    it('renders PostLayout and MDX content for a valid post', async () => {
      render(await BlogPostPage({ params: Promise.resolve({ slug: 'public-post' }) }));

      expect(notFound).not.toHaveBeenCalled();
      const layout = screen.getByTestId('post-layout');
      expect(layout).toBeInTheDocument();
      expect(layout).toHaveAttribute('data-title', 'Public Post');

      expect(screen.getByTestId('mdx-content')).toBeInTheDocument();
    });

    it('renders JSON-LD schema correctly', async () => {
      const { container } = render(
        await BlogPostPage({ params: Promise.resolve({ slug: 'public-post' }) }),
      );

      const script = container.querySelector('script[type="application/ld+json"]');
      expect(script).toBeInTheDocument();

      const jsonLd = JSON.parse(script!.innerHTML);
      expect(jsonLd['@type']).toBe('BlogPosting');
      expect(jsonLd.headline).toBe('Public Post');
      expect(jsonLd.description).toBe('A public post');
      expect(jsonLd.image).toEqual(['https://test.com/og-image.jpg']);
      expect(jsonLd.author[0].name).toBe('Test Name');
      expect(jsonLd.mainEntityOfPage['@id']).toBe('https://test.com/blog/public-post');
    });
  });
});
