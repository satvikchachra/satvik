import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { DevPrivateToggle } from './dev-private-toggle';

describe('DevPrivateToggle', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('renders toggle and children in development mode', () => {
    vi.stubEnv('NODE_ENV', 'development');
    render(
      <DevPrivateToggle>
        <div data-testid="child">Child Content</div>
      </DevPrivateToggle>,
    );

    // Toggle should be present
    expect(screen.getByLabelText('Toggle private blogs visibility')).toBeInTheDocument();
    expect(screen.getByText('Dev Mode:')).toBeInTheDocument();

    // Child should be present
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('does not render toggle but renders children in production mode', () => {
    vi.stubEnv('NODE_ENV', 'production');
    render(
      <DevPrivateToggle>
        <div data-testid="child">Child Content</div>
      </DevPrivateToggle>,
    );

    // Toggle should NOT be present
    expect(screen.queryByLabelText('Toggle private blogs visibility')).not.toBeInTheDocument();
    expect(screen.queryByText('Dev Mode:')).not.toBeInTheDocument();

    // Child should still be present
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('supports custom keyboard focus styling using group-has-[:focus-visible]', () => {
    vi.stubEnv('NODE_ENV', 'development');
    render(
      <DevPrivateToggle>
        <div>Child</div>
      </DevPrivateToggle>,
    );
    const input = screen.getByLabelText('Toggle private blogs visibility');
    expect(input).toHaveClass('sr-only');

    // The next sibling of the input is the custom switch div
    const switchDiv = input.nextElementSibling;
    expect(switchDiv).toHaveClass('group-has-[:focus-visible]:outline');
    expect(switchDiv).toHaveClass('group-has-[:focus-visible]:outline-accent');
  });

  it('toggles checkbox state when Enter key is pressed', () => {
    vi.stubEnv('NODE_ENV', 'development');
    render(
      <DevPrivateToggle>
        <div>Child</div>
      </DevPrivateToggle>,
    );
    const input = screen.getByLabelText('Toggle private blogs visibility') as HTMLInputElement;

    // Default state is checked
    expect(input.checked).toBe(true);

    // Press Enter
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(input.checked).toBe(false);

    // Press Enter again
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(input.checked).toBe(true);
  });
});
