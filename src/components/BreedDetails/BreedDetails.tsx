import { useLoaderData } from 'react-router-dom';

import type { BreedInfo } from '@/Services/DogService/types';

import './BreedDetailsStyles.scss';

function BreedDetails() {
  const breed = useLoaderData<BreedInfo>();

  if (!breed) {
    return <div>Breed not found</div>;
  }

  return (
    <div className="breed-details">
      {breed?.reference_image_id && (
        <img
          src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`}
          alt={breed.name}
          className="breed-image"
        />
      )}
      <h2>{breed?.name}</h2>

      <div className="info-section">
        <h3>Basic Info</h3>
        <p>
          <strong>Bred for:</strong> {breed?.bred_for ?? 'N/A'}
        </p>
        <p>
          <strong>Breed group:</strong> {breed?.breed_group ?? 'N/A'}
        </p>
        <p>
          <strong>Life span:</strong> {breed?.life_span ?? 'N/A'}
        </p>
        <p>
          <strong>Temperament:</strong> {breed?.temperament ?? 'N/A'}
        </p>
      </div>

      <div className="info-section">
        <h3>Physical Characteristics</h3>
        <p>
          <strong>Weight:</strong> {breed?.weight.metric} kg (
          {breed?.weight.imperial} lbs)
        </p>
        <p>
          <strong>Height:</strong> {breed?.height.metric} cm (
          {breed?.height.imperial} in)
        </p>
      </div>
    </div>
  );
}

export default BreedDetails;
