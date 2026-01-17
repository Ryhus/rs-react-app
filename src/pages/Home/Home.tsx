import { useSearchParams, Outlet } from 'react-router-dom';

import {
  SearchForm,
  BreedList,
  Pagination,
  NoResultsPlaceholder,
  Loader,
  Flyout,
  ErrorComponent,
} from '@/components';

import { useBreeds, useInvalidateBreeds } from '@/hooks/queries/dogQueries';

import './HomeStyles.scss';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const detailId = searchParams.get('details');
  const page = Number(searchParams.get('page') || 1) - 1;
  const searchTerm =
    searchParams.get('breed') || localStorage.getItem('lastSearchTerm') || '';

  const {
    data: breeds = [],
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useBreeds(page, searchTerm);

  const invalidateBreeds = useInvalidateBreeds();
  console.log(isFetching);

  const handleCardClick = (breedId: number) => {
    searchParams.append('details', breedId.toString());
    setSearchParams(searchParams);
  };

  const handleCloseDetails = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
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
        <SearchForm />

        <button onClick={invalidateBreeds} className="refresh-btn">
          {isFetching && !isLoading ? (
            <span className="spinner" />
          ) : (
            '🔄 Refresh'
          )}
        </button>

        {isLoading && !detailId && <Loader />}
        {isError && <ErrorComponent error={error as Error} onRetry={refetch} />}
        {!isLoading && !isError && (
          <>
            {breeds.length === 0 ? (
              <NoResultsPlaceholder />
            ) : (
              <BreedList breeds={breeds} onCardClick={handleCardClick} />
            )}
            {!searchTerm && (
              <Pagination
                itemsOnCurrentPage={breeds.length}
                currentPage={page}
              />
            )}
          </>
        )}
        <Flyout />
      </div>

      {detailId && (
        <div className="detail-panel">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <button className="close-btn" onClick={handleCloseDetails}>
                &times;
              </button>
              <Outlet />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
