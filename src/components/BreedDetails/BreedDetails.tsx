import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBreedById } from '../../Services/DogService/DogService';
import Loader from '../Loader/Loader';
import type { Breed } from '../../Services/DogService/types';

function BreedDetails() {
  const { breedId } = useParams();
  const [breed, setBreed] = useState<Breed | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!breedId) return;
    const getBreed = async () => {
      setLoading(true);
      try {
        const data = await getBreedById(breedId);
        setBreed(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getBreed();
  }, [breedId]);

  if (loading) return <Loader />;
  if (!breed) return <p>Breed not found.</p>;

  return (
    <div className="breed-details">
      <h2>{breed.name ?? ''}</h2>
      <p>Temperament: {breed.temperament ?? ''}</p>
      <p>Origin: {breed.origin ?? ''}</p>
    </div>
  );
}

export default BreedDetails;
