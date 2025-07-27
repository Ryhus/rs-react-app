import BreedCard from '../BreedCard/BreedCard';
import type { Breed } from '../../Services/DogService/types';

import './BreedListStyles.scss';

interface BreedListProps {
  breeds: Breed[];
  onCardClick: (id: string) => void;
}

function BreedList({ breeds, onCardClick }: BreedListProps) {
  return (
    <section className="breed-list">
      {breeds.map((breed) => (
        <BreedCard
          key={breed.id}
          breed={breed}
          onClick={() => onCardClick(breed.id ?? '1')}
        />
      ))}
    </section>
  );
}

export default BreedList;
