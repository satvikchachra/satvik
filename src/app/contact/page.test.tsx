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

    const twitterLink = screen.getByRole('link', { name: /twitter \/ x: satvikchachra/i });
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/satvikchachra');

    const linkedinLink = screen.getByRole('link', { name: /linkedin: satvikchachra/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/satvikchachra');

    const emailLink = screen.getByRole('link', { name: /email: consultwithsatvik@gmail.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:consultwithsatvik@gmail.com');
    expect(emailLink).not.toHaveAttribute('target', '_blank'); // email shouldn't have target blank
  });
});
