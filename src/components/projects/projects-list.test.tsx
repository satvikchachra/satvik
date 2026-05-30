import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectsList } from './projects-list';
import type { Project } from '@/lib/projects';
import { PROJECTS_CONTENT } from '@/lib/content';

describe('ProjectsList', () => {
  it('renders a message when no projects are found', () => {
    render(<ProjectsList projects={[]} />);
    expect(screen.getByText(PROJECTS_CONTENT.noProjectsFound)).toBeInTheDocument();
  });

  it('renders a list of projects correctly', () => {
    const mockProjects: Project[] = [
      {
        slug: 'project-1',
        title: 'Project One',
        description: 'Description **bold** text.',
        year: '2023',
        status: 'active',
        company: 'Company A',
        liveUrl: 'https://example.com',
        tags: ['React', 'TypeScript'],
        bullets: ['Feature 1', 'Feature 2'],
      },
      {
        slug: 'project-2',
        title: 'Project Two',
        description: 'Description 2.',
        year: '2022',
        status: 'archived',
        tags: ['Next.js'],
      },
    ] as unknown as Project[];

    render(<ProjectsList projects={mockProjects} />);

    // Assert Project One
    expect(screen.getByRole('heading', { name: 'Project One' })).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText(PROJECTS_CONTENT.activeLabel)).toBeInTheDocument();
    expect(screen.getByText('Company A')).toBeInTheDocument();

    // Check URL formatting
    const liveLink = screen.getByRole('link', { name: /example\.com/i });
    expect(liveLink).toHaveAttribute('href', 'https://example.com');

    // Check Description and Bullets
    expect(screen.getAllByText(/Description/)[0]).toBeInTheDocument();
    expect(screen.getByText('bold')).toBeInTheDocument(); // formatted text
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();

    // Check tags
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();

    // Assert Project Two
    expect(screen.getByRole('heading', { name: 'Project Two' })).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.queryByText('archived')).not.toBeInTheDocument(); // active badge shouldn't render for archived
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });
});
