import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './footer';

// Mock CurrentYear so it doesn't fail based on current year changes during tests
vi.mock('./current-year', () => ({
  CurrentYear: () => <span data-testid="current-year-mock">2024</span>,
}));

describe('Footer', () => {
  it('renders social links and copyright', () => {
    render(<Footer />);
    
    // Check social links
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/satvikchachra');
    expect(githubLink).toHaveAttribute('target', '_blank');

    const twitterLink = screen.getByRole('link', { name: /x \(twitter\)/i });
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/satvikchachra');
    
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/satvikchachra');

    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:consultwithsatvik@gmail.com');
    expect(emailLink).not.toHaveAttribute('target', '_blank');

    // Check copyright
    expect(screen.getByText(/©/)).toBeInTheDocument();
    expect(screen.getByTestId('current-year-mock')).toHaveTextContent('2024');
  });
});
