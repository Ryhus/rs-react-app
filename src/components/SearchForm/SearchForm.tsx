import { type ChangeEvent, useState } from 'react';
import { Form } from 'react-router-dom';

import { PopUpMessage } from '@/components';
import { usePersistedSearchQuery } from '@/hooks/usePersistentSearchQuery';

import './SearchFormStyles.scss';

function SearchForm() {
  const [query, setQuery] = usePersistedSearchQuery();
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    setError('');
  };

  return (
    <Form className="search-bar" method="get">
      <span>🔍</span>
      <input type="text" name="breed" value={query} onChange={handleChange} />
      <button type="button" className="clear-btn" onClick={handleClear}>
        &times;
      </button>
      <button type="submit" className="submit-btn">
        Search
      </button>
      {error && <PopUpMessage message={error} onClose={() => setError('')} />}
    </Form>
  );
}

export default SearchForm;
