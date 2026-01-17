import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import NoResultsPlaceholder from './NoResultsPlaceholder';

describe('NoResultsPlaceholder', () => {
  it('renders no results placeholder', () => {
    render(<NoResultsPlaceholder />);

    const wrapper = screen.getByTestId('no-results-placeholder');

    expect(wrapper).toBeInTheDocument();
  });
});
