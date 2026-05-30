import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from './not-found';
import { NOT_FOUND_CONTENT } from '@/lib/content';

vi.mock('next/link', () => ({
  default: ({ children, href, id }: { children: React.ReactNode; href: string; id?: string }) => (
    <a href={href} data-testid={`link-${id || href}`}>
      {children}
    </a>
  ),
}));

describe('NotFoundPage', () => {
  it('renders the 404 message and link', () => {
    render(<NotFound />);

    // Check main heading
    expect(
      screen.getByRole('heading', { name: new RegExp(NOT_FOUND_CONTENT.heading, 'i'), level: 1 }),
    ).toBeInTheDocument();

    // Check for some known text
    expect(
      screen.getByText(new RegExp(NOT_FOUND_CONTENT.description.slice(0, 15), 'i')),
    ).toBeInTheDocument();

    // Check for go home link
    const homeLink = screen.getByTestId('link-not-found-home-link');
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveTextContent(NOT_FOUND_CONTENT.goHome);
  });
});
