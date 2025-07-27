import { useEffect, useState } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import BreedList from '../../components/BreedList/BreedList';
import PopUpMessage from '../../components/PopUpMessage/PopUpMessage';
import NoResultsPlaceholder from '../../components/NoResultsPlaceholder/NoResultsPlaceholder';
import Loader from '../../components/Loader/Loader';

import {
  getAllBreeds,
  searchBreeds,
} from '../../Services/DogService/DogService';
import { usePersistedSearchQuery } from '../../components/hooks/usePersistentSearchQuery';
import type { Breed } from '../../Services/DogService/types';

import './HomeStyles.scss';

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [query] = usePersistedSearchQuery();

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      try {
        const result =
          query.trim() === ''
            ? await getAllBreeds()
            : await searchBreeds(query);
        setBreeds(result);
      } catch (err) {
        console.error('Failed to fetch breeds on load', err);
        setError('Failed to load dog breeds. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, [query]);

  const handleSearch = async (breeds: Breed[]) => {
    setLoading(true);
    setTimeout(() => {
      setBreeds(breeds);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="home-page-container">
      <h1 className="search-hint">
        Looking for your favorite dog breed? 🐶
        <br />
        Try searching for <em>Beagle</em> or <em>Labrador!</em>
      </h1>
      <SearchForm onSearch={handleSearch} />
      {loading ? (
        <Loader />
      ) : breeds.length === 0 ? (
        <NoResultsPlaceholder />
      ) : (
        <BreedList breeds={breeds} />
      )}
      {error && <PopUpMessage message={error} onClose={() => setError('')} />}
    </div>
  );
}

export default Home;
