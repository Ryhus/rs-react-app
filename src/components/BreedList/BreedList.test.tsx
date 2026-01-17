import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import BreedList from './BreedList';
import type { Breed } from '../../Services/DogService/types';

const mockBreedsArray: Breed[] = [
  {
    id: '1',
    name: 'Corgi',
    image: { id: '1', width: 300, height: 300, url: 'test-img.jpg' },
  },
  {
    id: '2',
    name: 'Labrador',
    image: { id: '2', width: 300, height: 300, url: 'test-img2.jpg' },
  },
];

describe('BreedList', () => {
  it('renders BreedCards for each breed', () => {
    render(<BreedList breeds={mockBreedsArray} />);

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(mockBreedsArray.length);
  });

  it('renders nothing when BreedList is empty', () => {
    render(<BreedList breeds={[]} />);

    const cards = screen.queryAllByRole('article');
    expect(cards).toHaveLength(0);
  });
});
