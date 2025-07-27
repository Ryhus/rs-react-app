import { type ChangeEvent, type FormEvent, useState } from 'react';
import {
  searchBreeds,
  getAllBreeds,
} from '../../Services/DogService/DogService';
import PopUpMessage from '../PopUpMessage/PopUpMessage';
import { usePersistedSearchQuery } from '../hooks/usePersistentSearchQuery';
import type { Breed } from '../../Services/DogService/types';

import './SearchFormStyles.scss';

interface SearchFormProps {
  onSearch: (breeds: Breed[]) => void;
}

function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = usePersistedSearchQuery();
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    setError('');

    try {
      const result =
        trimmed === '' ? await getAllBreeds() : await searchBreeds(trimmed);
      onSearch(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? 'Failed to load dog breeds. Please try again later.'
          : 'Something went wrong. Please try again.'
      );
    }
  };

  const handleClear = () => {
    setQuery('');
    setError('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <span>🔍</span>
      <input type="text" name="breed" value={query} onChange={handleChange} />
      <button type="button" className="clear-btn" onClick={handleClear}>
        ✖
      </button>
      <button type="submit" className="submit-btn">
        Search
      </button>
      {error && <PopUpMessage message={error} onClose={() => setError('')} />}
    </form>
  );
}

export default SearchForm;
