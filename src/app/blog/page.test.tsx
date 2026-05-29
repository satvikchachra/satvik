import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BlogPage from './page';

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

    expect(screen.getByText('posts are on their way.')).toBeInTheDocument();
    expect(screen.getByText('drop in again soon.')).toBeInTheDocument();
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

    expect(screen.queryByText('posts are on their way.')).not.toBeInTheDocument();
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
    expect(jsonLd['@type']).toBe('BreadcrumbList');
    expect(jsonLd.itemListElement[0].name).toBe('Home');
    expect(jsonLd.itemListElement[0].item).toBe('https://test.com');
    expect(jsonLd.itemListElement[1].name).toBe('Blog');
    expect(jsonLd.itemListElement[1].item).toBe('https://test.com/blog');
  });

  it('renders the header text correctly', async () => {
    const { getAllPosts } = await import('@/lib/blog');
    vi.mocked(getAllPosts).mockReturnValue([]);

    render(<BlogPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('blog');
    expect(screen.getByText(/Opinion pieces, engineering case studies/)).toBeInTheDocument();
  });
});
