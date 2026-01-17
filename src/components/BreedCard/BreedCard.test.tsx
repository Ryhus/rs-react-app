import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import BreedCard from './BreedCard';

import type { BreedInfo } from '@/Services/DogService/types';

describe('BreeCard', () => {
  const mockBreedData: BreedInfo = {
    id: 1,
    name: 'Corgi',
    weight: {
      imperial: '20 - 30',
      metric: '9 - 14',
    },
    height: {
      imperial: '10 - 12',
      metric: '25 - 30',
    },
    image: {
      url: 'test-image.jpg',
    },
  };

  it('renders the img and the name of the breed', () => {
    render(<BreedCard breed={mockBreedData} onClick={() => {}} />);

    const breedImg = screen.getByRole('img');
    const breedNameHeading = screen.getByRole('heading', { level: 2 });

    expect(breedImg).toHaveAttribute('src', mockBreedData.image?.url);
    expect(breedImg).toHaveAttribute('alt', mockBreedData.name);

    expect(breedNameHeading).toHaveTextContent(mockBreedData.name ?? '');
  });
});
