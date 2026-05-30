import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from './not-found';

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
    expect(screen.getByRole('heading', { name: /page not found/i, level: 1 })).toBeInTheDocument();
    
    // Check for some known text
    expect(screen.getByText(/whatever you were looking for doesn't exist here/i)).toBeInTheDocument();
    
    // Check for go home link
    const homeLink = screen.getByTestId('link-not-found-home-link');
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveTextContent('← go home');
  });
});
