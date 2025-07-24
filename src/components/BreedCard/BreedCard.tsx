import type { Breed } from '../../Services/DogService/types';

import './BreedCardStyles.scss';

interface BreedProps {
  breed: Breed;
}

function BreedCard({ breed }: BreedProps) {
  return (
    <article className="breed-card">
      <img src={breed.image?.url} alt={breed.name} />
      <h2>{breed.name}</h2>
    </article>
  );
}

export default BreedCard;
