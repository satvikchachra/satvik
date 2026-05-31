import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BlogPage from './page';
import { BLOG_CONTENT } from '@/lib/content';

// Mock the data layer
vi.mock('@/lib/blog', () => ({
  getAllPosts: vi.fn(),
}));

// Mock the components
vi.mock('@/components/blog/blog-list', () => ({
  BlogList: () => <div data-testid="blog-list" />,
}));
vi.mock('@/components/blog/dev-private-toggle', () => ({
  DevPrivateToggle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dev-private-toggle">{children}</div>
  ),
}));

// Mock metadata (it's exported, but we're just testing the default export component)
vi.mock('@/lib/metadata', () => ({
  buildMetadata: vi.fn(),
  siteConfig: { url: 'https://test.com' },
}));
describe('BlogPage', () => {
  it('renders the empty state when no posts are available', async () => {
    const { getAllPosts } = await import('@/lib/blog');
    vi.mocked(getAllPosts).mockReturnValue([]);

    render(<BlogPage />);

    expect(screen.getByText(BLOG_CONTENT.noPostsFound)).toBeInTheDocument();
    expect(screen.getByText(BLOG_CONTENT.dropInSoon)).toBeInTheDocument();
    expect(screen.queryByTestId('blog-list')).not.toBeInTheDocument();
  });

  it('renders the BlogList inside DevPrivateToggle when posts are available', async () => {
    const { getAllPosts } = await import('@/lib/blog');
    vi.mocked(getAllPosts).mockReturnValue([
      {
        slug: 'test',
        filename: 'test.mdx',
        title: 'Test',
        description: 'Test description',
        date: '2026-05-29',
        type: 'mdx',
        private: false,
        tags: [],
        readingTime: '5 min',
        image: '/img.jpg',
        ogImage: '/og.jpg',
      },
    ]);

    render(<BlogPage />);

    expect(screen.queryByText(BLOG_CONTENT.noPostsFound)).not.toBeInTheDocument();
    expect(screen.getByTestId('dev-private-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('blog-list')).toBeInTheDocument();
  });

  it('renders JSON-LD schema correctly', async () => {
    const { getAllPosts } = await import('@/lib/blog');
    vi.mocked(getAllPosts).mockReturnValue([]);

    const { container } = render(<BlogPage />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();

    const jsonLd = JSON.parse(script!.innerHTML);
    expect(jsonLd[0]['@type']).toBe('BreadcrumbList');
    expect(jsonLd[0].itemListElement[0].name).toBe('Home');
    expect(jsonLd[0].itemListElement[0].item).toBe('https://test.com');
    expect(jsonLd[0].itemListElement[1].name).toBe('Blog');
    expect(jsonLd[0].itemListElement[1].item).toBe('https://test.com/blog');
    expect(jsonLd[1]['@type']).toBe('ItemList');
  });

  it('renders the header text correctly', async () => {
    const { getAllPosts } = await import('@/lib/blog');
    vi.mocked(getAllPosts).mockReturnValue([]);

    render(<BlogPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(BLOG_CONTENT.heroTitle);
    expect(screen.getByText(BLOG_CONTENT.heroSubtitle)).toBeInTheDocument();
  });
});
