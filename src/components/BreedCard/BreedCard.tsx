import type { Breed } from '../../Services/DogService/types';

import './BreedCardStyles.scss';

interface BreedProps {
  breed: Breed;
  onClick: () => void;
}

function BreedCard({ breed, onClick }: BreedProps) {
  return (
    <article className="breed-card" onClick={onClick}>
      <img src={breed.image?.url} alt={breed.name} />
      <h2>{breed.name}</h2>
    </article>
  );
}

export default BreedCard;
