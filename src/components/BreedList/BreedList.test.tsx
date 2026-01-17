import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import BreedList from './BreedList';
import type { BreedInfo } from '@/Services/DogService/types';

const mockBreedsArray: BreedInfo[] = [
  {
    id: 1,
    name: 'Corgi',
    weight: { imperial: '25', metric: '11' },
    height: { imperial: '10', metric: '25' },
    image: { url: 'test-img.jpg' },
  },
  {
    id: 2,
    name: 'Labrador',
    weight: { imperial: '65', metric: '29' },
    height: { imperial: '22', metric: '56' },
    image: { url: 'test-img2.jpg' },
  },
];

describe('BreedList', () => {
  it('renders BreedCards for each breed', () => {
    render(<BreedList breeds={mockBreedsArray} onCardClick={() => {}} />);

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(mockBreedsArray.length);
  });

  it('renders nothing when BreedList is empty', () => {
    render(<BreedList breeds={[]} onCardClick={() => {}} />);

    const cards = screen.queryAllByRole('article');
    expect(cards).toHaveLength(0);
  });

  it('calls onCardClick with breed id when a BreedCard is clicked', () => {
    const onCardClickMock = vi.fn();
    render(
      <BreedList breeds={mockBreedsArray} onCardClick={onCardClickMock} />
    );

    const cards = screen.getAllByRole('article');

    fireEvent.click(cards[0]);

    expect(onCardClickMock).toHaveBeenCalledTimes(1);
    expect(onCardClickMock).toHaveBeenCalledWith(mockBreedsArray[0].id);
  });
});
