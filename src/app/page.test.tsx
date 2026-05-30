import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './page';
import * as blogModule from '@/lib/blog';

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
    
    expect(screen.getByRole('heading', { name: /satvik chachra/i })).toBeInTheDocument();
    expect(screen.getByText(/builds ai coding agents, full-stack software & infrastructure/i)).toBeInTheDocument();
  });

  it('renders the wins section', () => {
    vi.mocked(blogModule.getAllPosts).mockReturnValue([]);
    render(<HomePage />);
    
    expect(screen.getByRole('heading', { name: /selected wins/i })).toBeInTheDocument();
    expect(screen.getByText('2K+ users daily')).toBeInTheDocument();
    expect(screen.getByText('Built AI coding agent at Atlassian')).toBeInTheDocument();
    expect(screen.getByTestId('link-view-all-projects')).toHaveAttribute('href', '/projects');
  });

  it('renders the experience section', () => {
    vi.mocked(blogModule.getAllPosts).mockReturnValue([]);
    render(<HomePage />);
    
    expect(screen.getByRole('heading', { name: /experience/i })).toBeInTheDocument();
    expect(screen.getAllByText('Atlassian')[0]).toBeInTheDocument();
    expect(screen.getByText('AppyHigh')).toBeInTheDocument();
    
    // Verify external link attributes
    const atlassianLink = screen.getAllByRole('link', { name: /Atlassian/i })[0];
    expect(atlassianLink).toHaveAttribute('target', '_blank');
    expect(atlassianLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders recent blogs section when posts are available', () => {
    const mockPosts = [
      {
        slug: 'post-1',
        title: 'First Post',
        date: '2024-01-01T00:00:00Z',
        summary: 'Summary 1',
        image: '/img1.jpg',
        isPrivate: false,
      },
      {
        slug: 'post-2',
        title: 'Second Post',
        date: '2024-01-02T00:00:00Z',
        summary: 'Summary 2',
        image: '/img2.jpg',
        isPrivate: false,
      }
    ];
    vi.mocked(blogModule.getAllPosts).mockReturnValue(mockPosts);
    
    render(<HomePage />);
    
    expect(screen.getByRole('heading', { name: /recent blogs/i })).toBeInTheDocument();
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
    expect(screen.getByTestId('link-post-post-1')).toHaveAttribute('href', '/blog/post-1');
    expect(screen.getByTestId('link-view-all-posts')).toHaveAttribute('href', '/blog');
  });

  it('does not render recent blogs section when no posts are available', () => {
    vi.mocked(blogModule.getAllPosts).mockReturnValue([]);
    
    render(<HomePage />);
    
    expect(screen.queryByRole('heading', { name: /recent blogs/i })).not.toBeInTheDocument();
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
