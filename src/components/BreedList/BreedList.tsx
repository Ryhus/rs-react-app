import { BreedCard } from '@/components';
import type { BreedInfo } from '@/Services/DogService/types';

import './BreedListStyles.scss';

interface BreedListProps {
  breeds: BreedInfo[];
  onCardClick: (id: number) => void;
}

function BreedList({ breeds, onCardClick }: BreedListProps) {
  return (
    <section className="breed-list">
      {breeds.map((breed) => (
        <BreedCard
          key={breed.id}
          breed={breed}
          onClick={() => onCardClick(breed.id)}
        />
      ))}
    </section>
  );
}

export default BreedList;
