import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BlogList } from './blog-list';

// Mock utils
vi.mock('@/lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/utils')>();
  return {
    ...actual,
    formatDate: vi.fn().mockImplementation((date) => `Formatted: ${date}`),
  };
});

describe('BlogList', () => {
  it('renders "no posts found" when empty', () => {
    render(<BlogList posts={[]} />);
    expect(screen.getByText('no posts found.')).toBeInTheDocument();
  });

  it('renders a list of posts correctly', () => {
    const posts = [
      {
        slug: 'post-1',
        filename: 'post-1.mdx',
        title: 'Post 1 Title',
        description: 'Post 1 Description',
        date: '2026-05-29',
        type: 'mdx' as const,
        private: false,
        tags: [],
        readingTime: '5 min',
        image: '/img.jpg',
        ogImage: '/og.jpg',
      },
      {
        slug: 'post-2',
        filename: 'post-2.mdx',
        title: 'Post 2 Title',
        description: 'Post 2 Description',
        date: '2026-05-30',
        type: 'mdx' as const,
        private: true,
        tags: [],
        readingTime: '5 min',
        image: '/img.jpg',
        ogImage: '/og.jpg',
      },
    ];
    render(<BlogList posts={posts} />);

    // Post 1
    expect(screen.getByText('Post 1 Title')).toBeInTheDocument();
    expect(screen.getByText('Post 1 Description')).toBeInTheDocument();
    expect(screen.getByText('Formatted: 2026-05-29')).toBeInTheDocument();
    
    // Post 2
    expect(screen.getByText('Post 2 Title')).toBeInTheDocument();
    expect(screen.getByText('Post 2 Description')).toBeInTheDocument();
    expect(screen.getByText('Formatted: 2026-05-30')).toBeInTheDocument();

    // Private badge
    expect(screen.getByText('Private')).toBeInTheDocument();

    // Verify it links to the correct place
    expect(screen.getByRole('link', { name: /Post 1 Title/i })).toHaveAttribute('href', '/blog/post-1');
  });
});
