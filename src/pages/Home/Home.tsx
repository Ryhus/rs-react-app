import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
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

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const detailId = searchParams.get('details');

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

  const handleCardClick = (breedId: string) => {
    searchParams.set('details', breedId);
    setSearchParams(searchParams);
    navigate(`/details/${breedId}?${searchParams.toString()}`);
  };

  const handleCloseDetails = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
    navigate({ pathname: '/', search: searchParams.toString() });
  };

  return (
    <div className={`home-page-container ${detailId ? 'split-view' : ''}`}>
      <div
        className="master"
        onClick={() => {
          if (detailId) handleCloseDetails();
        }}
      >
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
          <BreedList breeds={breeds} onCardClick={handleCardClick} />
        )}
        {error && <PopUpMessage message={error} onClose={() => setError('')} />}
      </div>

      {detailId && (
        <div className="detail-panel">
          <button className="close-btn" onClick={handleCloseDetails}>
            ✖
          </button>
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default Home;
