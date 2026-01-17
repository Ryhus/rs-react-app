import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const ProblemChild = () => {
    throw new Error('Test error');
  };

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Normal content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal content')).toBeInTheDocument();
  });

  it('renders fallback UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/oops! something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Try reloading the app./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
  });
});
