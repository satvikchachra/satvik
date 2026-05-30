import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutPage from './page';

describe('AboutPage', () => {
  it('renders the header and content', () => {
    const { container } = render(<AboutPage />);
    
    // Check main heading
    expect(screen.getByRole('heading', { name: /satvik chachra/i, level: 1 })).toBeInTheDocument();
    
    // Check for some known text
    expect(screen.getByText(/AI-native full stack engineer/i)).toBeInTheDocument();
  });
});
