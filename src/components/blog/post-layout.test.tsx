import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PostLayout } from './post-layout';

import type React from 'react';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ''} />;
  },
}));

// Mock utils
vi.mock('@/lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/utils')>();
  return {
    ...actual,
    formatDate: vi.fn().mockImplementation((date) => `Formatted: ${date}`),
  };
});

// Mock ShareMenu since we have separate tests for it
vi.mock('./share-menu', () => ({
  ShareMenu: ({ title }: { title: string }) => <div data-testid="share-menu">{title}</div>,
}));

describe('PostLayout', () => {
  it('renders correctly with all props', () => {
    render(
      <PostLayout
        title="Test Title"
        description="Test Description"
        date="2026-05-29"
        readingTime="5 min read"
        image="/test.jpg"
      >
        <div data-testid="children">Child content</div>
      </PostLayout>,
    );

    // Header elements
    expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    // Image
    const image = screen.getByAltText('Cover image for Test Title');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test.jpg');

    // Meta elements
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('Formatted: 2026-05-29')).toBeInTheDocument();

    // Children
    expect(screen.getByTestId('children')).toBeInTheDocument();

    // Share Menu
    expect(screen.getByTestId('share-menu')).toHaveTextContent('Test Title');
  });

  it('renders correctly without readingTime', () => {
    render(
      <PostLayout
        title="Test Title"
        description="Test Description"
        date="2026-05-29"
        image="/test.jpg"
      >
        <div>Content</div>
      </PostLayout>,
    );

    // Reading time shouldn't be present
    expect(screen.queryByText('min read')).not.toBeInTheDocument();
    // Dot separator shouldn't be present
    expect(screen.queryByText('·')).not.toBeInTheDocument();
    // Date should still be present
    expect(screen.getByText('Formatted: 2026-05-29')).toBeInTheDocument();
  });
});
