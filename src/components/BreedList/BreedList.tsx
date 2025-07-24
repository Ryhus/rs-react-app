import BreedCard from '../BreedCard/BreedCard';
import type { Breed } from '../../Services/DogService/types';

import './BreedListStyles.scss';

interface BreedListProps {
  breeds: Breed[];
}

function BreedList({ breeds }: BreedListProps) {
  return (
    <section className="breed-list">
      {breeds.map((breed) => (
        <BreedCard key={breed.id} breed={breed} />
      ))}
    </section>
  );
}

export default BreedList;
