'use client';

import { BreedCard } from '@/components';
import type { BreedInfo } from '@/Services/DogService/types';

import './BreedListStyles.scss';

interface BreedListProps {
  breeds: BreedInfo[];
  breedId: number;
}

function BreedList({ breeds, breedId }: BreedListProps) {
  // const handleCardClick = (breedId: number) => {
  //   searchParams.append('details', breedId.toString());
  //   setSearchParams(searchParams);
  // };

  return (
    <section className="breed-list">
      {breeds.map((breed) => (
        <BreedCard
          key={breed.id}
          breed={breed}
          onClick={() => console.log(breedId)}
        />
      ))}
    </section>
  );
}

export default BreedList;
