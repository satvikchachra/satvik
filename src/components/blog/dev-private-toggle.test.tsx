import { render, screen } from '@testing-library/react';
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
});
