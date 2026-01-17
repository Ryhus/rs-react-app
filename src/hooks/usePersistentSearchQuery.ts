import { useState, useEffect } from 'react';

const SEARCH_KEY = 'lastSearchTerm';

export function usePersistedSearchQuery() {
  const [query, setQuery] = useState(() => {
    return localStorage.getItem(SEARCH_KEY) || '';
  });

  useEffect(() => {
    localStorage.setItem(SEARCH_KEY, query);
  }, [query]);

  return [query, setQuery] as const;
}
