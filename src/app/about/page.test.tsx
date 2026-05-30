import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutPage from './page';
import { ABOUT_CONTENT } from '@/lib/content';

describe('AboutPage', () => {
  it('renders the header and content', () => {
    const { container } = render(<AboutPage />);

    // Check main heading
    expect(
      screen.getByRole('heading', { name: new RegExp(ABOUT_CONTENT.heroTitle, 'i'), level: 1 }),
    ).toBeInTheDocument();

    // Check for some known text
    expect(container.textContent).toContain(ABOUT_CONTENT.introParagraph1.replace(/[*_]/g, ''));
  });

  it('renders the experience section', () => {
    render(<AboutPage />);

    expect(
      screen.getByRole('heading', { name: new RegExp(ABOUT_CONTENT.sectionExperience, 'i') }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Atlassian')[0]).toBeInTheDocument();

    // Verify external link attributes
    const atlassianLink = screen.getAllByRole('link', { name: /Atlassian/i })[0];
    expect(atlassianLink).toHaveAttribute('target', '_blank');
    expect(atlassianLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the tech stack section', () => {
    render(<AboutPage />);

    expect(
      screen.getByRole('heading', { name: new RegExp(ABOUT_CONTENT.sectionStack, 'i') }),
    ).toBeInTheDocument();
    expect(screen.getByText(ABOUT_CONTENT.stack[0].category)).toBeInTheDocument();
    expect(screen.getByText(ABOUT_CONTENT.stack[2].category)).toBeInTheDocument();
    expect(screen.getByText(ABOUT_CONTENT.stack[2].items[0])).toBeInTheDocument();
  });

  it('renders the education section', () => {
    render(<AboutPage />);

    expect(
      screen.getByRole('heading', { name: new RegExp(ABOUT_CONTENT.sectionEducation, 'i') }),
    ).toBeInTheDocument();
    expect(screen.getByText(ABOUT_CONTENT.education[0].school)).toBeInTheDocument();
    expect(screen.getByText(ABOUT_CONTENT.education[1].school)).toBeInTheDocument();
  });

  it('renders the awards / recognition section', () => {
    render(<AboutPage />);

    expect(
      screen.getByRole('heading', { name: new RegExp(ABOUT_CONTENT.sectionAwards, 'i') }),
    ).toBeInTheDocument();
    expect(screen.getByText(ABOUT_CONTENT.awards[0].title)).toBeInTheDocument();
    expect(screen.getByText(ABOUT_CONTENT.awards[2].title)).toBeInTheDocument();
  });
});
