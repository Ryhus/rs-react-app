import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Loader from './Loader';

describe('Loader', () => {
  it('renders the loader structure', () => {
    render(<Loader />);

    const wrapper = screen.getByTestId('loader-wrapper');
    const dogWalk = screen.getByTestId('dog-walk');

    expect(wrapper).toBeInTheDocument();
    expect(dogWalk).toBeInTheDocument();
  });
});
