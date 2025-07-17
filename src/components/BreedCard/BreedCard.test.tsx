import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import BreedCard from './BreedCard';
import type { Breed } from '../../Services/DogService/types';

describe('BreeCard', () => {
  const mockBreedData: Breed = {
    id: '1',
    name: 'Corgi',
    image: {
      id: '1',
      height: 300,
      width: 300,
      url: 'test-image.jpg',
    },
  };

  it('renders the img and the name of the breed', () => {
    render(<BreedCard breed={mockBreedData} />);

    const breedImg = screen.getByRole('img');
    const breedNameHeading = screen.getByRole('heading', { level: 2 });

    expect(breedImg).toHaveAttribute('src', mockBreedData.image?.url);
    expect(breedImg).toHaveAttribute('alt', mockBreedData.name);

    expect(breedNameHeading).toHaveTextContent(mockBreedData.name ?? '');
  });
});
