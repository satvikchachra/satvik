import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectsPage from './page';

// Mock the ProjectsList component
vi.mock('@/components/projects/projects-list', () => ({
  ProjectsList: ({ projects }: { projects: any[] }) => (
    <div data-testid="projects-list-mock">
      Projects count: {projects.length}
    </div>
  ),
}));

// Mock the projects data to isolate the component
vi.mock('@/lib/projects', () => ({
  getAllProjects: () => [
    { slug: 'p1', title: 'Project 1' },
    { slug: 'p2', title: 'Project 2' },
  ],
}));

describe('ProjectsPage', () => {
  it('renders the header and the ProjectsList', () => {
    const { container } = render(<ProjectsPage />);
    
    // Check main heading
    expect(screen.getByRole('heading', { name: /projects/i, level: 1 })).toBeInTheDocument();
    
    // Check intro text
    expect(screen.getByText(/AI systems, platform infrastructure, and developer tools/i)).toBeInTheDocument();
    
    // Check if ProjectsList is rendered with correct data
    expect(screen.getByTestId('projects-list-mock')).toBeInTheDocument();
    expect(screen.getByText('Projects count: 2')).toBeInTheDocument();

    // Check JSON-LD
    const scriptTag = container.querySelector('script[type="application/ld+json"]');
    expect(scriptTag).toBeInTheDocument();
    
    const jsonLd = JSON.parse(scriptTag!.innerHTML);
    expect(jsonLd['@type']).toBe('BreadcrumbList');
  });
});
