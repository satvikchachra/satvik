import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutPage from './page';

describe('AboutPage', () => {
  it('renders the header and content', () => {
    render(<AboutPage />);
    
    // Check main heading
    expect(screen.getByRole('heading', { name: /satvik chachra/i, level: 1 })).toBeInTheDocument();
    
    // Check for some known text
    expect(screen.getByText(/AI-native full stack engineer/i)).toBeInTheDocument();
  });

  it('renders the experience section', () => {
    render(<AboutPage />);
    
    expect(screen.getByRole('heading', { name: /experience/i })).toBeInTheDocument();
    expect(screen.getAllByText('Atlassian')[0]).toBeInTheDocument();
    
    // Verify external link attributes
    const atlassianLink = screen.getAllByRole('link', { name: /Atlassian/i })[0];
    expect(atlassianLink).toHaveAttribute('target', '_blank');
    expect(atlassianLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the tech stack section', () => {
    render(<AboutPage />);
    
    expect(screen.getByRole('heading', { name: /tech stack/i })).toBeInTheDocument();
    expect(screen.getByText('AI / ML')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('ReactJS')).toBeInTheDocument();
  });

  it('renders the education section', () => {
    render(<AboutPage />);
    
    expect(screen.getByRole('heading', { name: /education/i })).toBeInTheDocument();
    expect(screen.getByText('Chitkara University')).toBeInTheDocument();
    expect(screen.getByText('CBSE Board')).toBeInTheDocument();
  });

  it('renders the awards / recognition section', () => {
    render(<AboutPage />);
    
    expect(screen.getByRole('heading', { name: /awards \/ recognition/i })).toBeInTheDocument();
    expect(screen.getByText('Brainiac Award')).toBeInTheDocument();
    expect(screen.getByText('Talent Star Award')).toBeInTheDocument();
  });
});
