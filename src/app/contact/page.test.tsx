import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactPage from './page';
import { CONTACT_CONTENT } from '@/lib/content';

describe('ContactPage', () => {
  it('renders the header and contact links', () => {
    render(<ContactPage />);

    // Check main heading
    expect(
      screen.getByRole('heading', { name: new RegExp(CONTACT_CONTENT.heroTitle, 'i'), level: 1 }),
    ).toBeInTheDocument();

    // Check for some known text
    expect(screen.getByText(new RegExp(CONTACT_CONTENT.introParagraph, 'i'))).toBeInTheDocument();

    // Check for links
    const githubLink = screen.getByRole('link', { name: /github: satvikchachra/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/satvikchachra');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noreferrer');

    const twitterLink = screen.getByRole('link', { name: /twitter \/ x: satvikchachra/i });
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/satvikchachra');
    expect(twitterLink).toHaveAttribute('target', '_blank');
    expect(twitterLink).toHaveAttribute('rel', 'noreferrer');

    const linkedinLink = screen.getByRole('link', { name: /linkedin: satvikchachra/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/satvikchachra');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noreferrer');

    const emailLink = screen.getByRole('link', { name: /email: consultwithsatvik@gmail.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:consultwithsatvik@gmail.com');
    expect(emailLink).not.toHaveAttribute('target');
    expect(emailLink).not.toHaveAttribute('rel');
  });

  it('renders the external link arrow with blue styling', () => {
    render(<ContactPage />);

    const arrows = screen.getAllByText('↗');
    expect(arrows.length).toBeGreaterThan(0);
    arrows.forEach((arrow) => {
      expect(arrow).toHaveClass('row-link-arrow', 'text-accent!');
    });
  });
});
