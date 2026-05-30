import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './footer';
import { FOOTER_CONTENT } from '@/lib/content';

describe('Footer', () => {
  it('renders social links and license', () => {
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

    // Check license
    expect(screen.getByText(FOOTER_CONTENT.license)).toBeInTheDocument();
  });
});
