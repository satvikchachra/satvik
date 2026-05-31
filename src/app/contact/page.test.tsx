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

    // Check for links dynamically
    CONTACT_CONTENT.links.forEach((link) => {
      const accessibleName = `${link.label}: ${link.handle}`;
      const socialLink = screen.getByRole('link', { name: accessibleName });
      expect(socialLink).toHaveAttribute('href', link.href);
      if (link.href.startsWith('mailto')) {
        expect(socialLink).not.toHaveAttribute('target');
        expect(socialLink).not.toHaveAttribute('rel');
      } else {
        expect(socialLink).toHaveAttribute('target', '_blank');
        expect(socialLink).toHaveAttribute('rel', 'noreferrer');
      }
    });
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
