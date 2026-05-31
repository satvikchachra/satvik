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
    expect(screen.getByText(/2K\+ engineers daily/i)).toBeInTheDocument();
  });

  it('renders the CTA row with correct links', () => {
    vi.mocked(blogModule.getAllPosts).mockReturnValue([]);
    render(<HomePage />);

    expect(screen.getByTestId('link-cta-work')).toHaveAttribute('href', '/projects');
    expect(screen.getByTestId('link-cta-about')).toHaveAttribute('href', '/about');
  });

  it('renders social links with correct attributes', () => {
    vi.mocked(blogModule.getAllPosts).mockReturnValue([]);
    render(<HomePage />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/satvikchachra');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noreferrer');

    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:consultwithsatvik@gmail.com');
    expect(emailLink).not.toHaveAttribute('target');
    expect(emailLink).not.toHaveAttribute('rel');
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
