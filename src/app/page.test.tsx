import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './page';
import * as blogModule from '@/lib/blog';
import { HOME_CONTENT } from '@/lib/content';

// Mock the Link component from Next.js
vi.mock('next/link', () => ({
  default: ({ children, href, id }: { children: React.ReactNode; href: string; id?: string }) => (
    <a href={href} data-testid={`link-${id || href}`}>
      {children}
    </a>
  ),
}));

// Mock the blog lib to control posts
vi.mock('@/lib/blog', () => ({
  getAllPosts: vi.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the hero section correctly', () => {
    vi.mocked(blogModule.getAllPosts).mockReturnValue([]);
    render(<HomePage />);

    expect(
      screen.getByRole('heading', { name: new RegExp(HOME_CONTENT.heroTitle, 'i') }),
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(HOME_CONTENT.heroSubtitle, 'i'))).toBeInTheDocument();
  });

  it('renders the wins section', () => {
    vi.mocked(blogModule.getAllPosts).mockReturnValue([]);
    render(<HomePage />);

    expect(
      screen.getByRole('heading', { name: new RegExp(HOME_CONTENT.sectionWins, 'i') }),
    ).toBeInTheDocument();
    expect(screen.getByText(HOME_CONTENT.wins[0][0])).toBeInTheDocument();
    expect(screen.getByText(HOME_CONTENT.wins[0][1])).toBeInTheDocument();
  });

  it('renders the CTA row with correct links', () => {
    vi.mocked(blogModule.getAllPosts).mockReturnValue([]);
    render(<HomePage />);

    expect(screen.getByTestId('link-cta-work')).toHaveAttribute('href', '/projects');
    expect(screen.getByTestId('link-cta-blog')).toHaveAttribute('href', '/blog');
    expect(screen.getByTestId('link-cta-contact')).toHaveAttribute('href', '/contact');
  });

  it('renders recent blogs section when posts are available', () => {
    const mockPosts = [
      {
        slug: 'post-1',
        title: 'First Post',
        date: '2024-01-01T00:00:00Z',
        summary: 'Summary 1',
        image: '/img1.jpg',
        private: false,
      },
      {
        slug: 'post-2',
        title: 'Second Post',
        date: '2024-01-02T00:00:00Z',
        summary: 'Summary 2',
        image: '/img2.jpg',
        private: false,
      },
      {
        slug: 'post-3',
        title: 'Third Post',
        date: '2024-01-03T00:00:00Z',
        summary: 'Summary 3',
        image: '/img3.jpg',
        private: false,
      },
      {
        slug: 'post-4',
        title: 'Fourth Post',
        date: '2024-01-04T00:00:00Z',
        summary: 'Summary 4',
        image: '/img4.jpg',
        private: false,
      },
      {
        slug: 'post-private',
        title: 'Private Post',
        date: '2024-01-05T00:00:00Z',
        summary: 'Private Summary',
        image: '/img-private.jpg',
        private: true,
      },
    ] as unknown as ReturnType<typeof blogModule.getAllPosts>;
    vi.mocked(blogModule.getAllPosts).mockReturnValue(mockPosts);

    render(<HomePage />);

    expect(
      screen.getByRole('heading', { name: new RegExp(HOME_CONTENT.sectionBlog, 'i') }),
    ).toBeInTheDocument();
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
    expect(screen.getByText('Third Post')).toBeInTheDocument();
    expect(screen.queryByText('Fourth Post')).not.toBeInTheDocument();
    expect(screen.queryByText('Private Post')).not.toBeInTheDocument();
    expect(screen.getByTestId('link-post-post-1')).toHaveAttribute('href', '/blog/post-1');
    expect(screen.getByTestId('link-view-all-posts')).toHaveAttribute('href', '/blog');
  });

  it('does not render recent blogs section when no posts are available', () => {
    vi.mocked(blogModule.getAllPosts).mockReturnValue([]);

    render(<HomePage />);

    expect(
      screen.queryByRole('heading', { name: new RegExp(HOME_CONTENT.sectionBlog, 'i') }),
    ).not.toBeInTheDocument();
  });

  it('injects JSON-LD structured data', () => {
    vi.mocked(blogModule.getAllPosts).mockReturnValue([]);
    const { container } = render(<HomePage />);

    const scriptTag = container.querySelector('script[type="application/ld+json"]');
    expect(scriptTag).toBeInTheDocument();

    const jsonLd = JSON.parse(scriptTag!.innerHTML);
    expect(jsonLd['@type']).toBe('ProfilePage');
    expect(jsonLd.mainEntity.name).toBe('Satvik Chachra');
  });
});
