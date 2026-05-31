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
    expect(githubLink).toHaveAttribute('rel', 'noreferrer');

    const twitterLink = screen.getByRole('link', { name: /x \(twitter\)/i });
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/satvikchachra');
    expect(twitterLink).toHaveAttribute('target', '_blank');
    expect(twitterLink).toHaveAttribute('rel', 'noreferrer');

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/satvikchachra');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noreferrer');

    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:consultwithsatvik@gmail.com');
    expect(emailLink).not.toHaveAttribute('target');
    expect(emailLink).not.toHaveAttribute('rel');

    // Check license
    expect(screen.getByText(FOOTER_CONTENT.license)).toBeInTheDocument();
  });
});
