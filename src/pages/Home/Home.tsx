import {
  useLoaderData,
  useNavigation,
  useSearchParams,
  Outlet,
} from 'react-router-dom';

import {
  SearchForm,
  BreedList,
  Pagination,
  NoResultsPlaceholder,
  Loader,
  Flyout,
} from '@/components';

import { type AllBreedsLoaderData } from '../../routes/DataHandlers/Home/HomeLoaders';

import './HomeStyles.scss';

function Home() {
  const data = useLoaderData<AllBreedsLoaderData>();

  const [searchParams, setSearchParams] = useSearchParams();

  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  const detailId = searchParams.get('details');

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
        {isLoading && !detailId ? (
          <Loader />
        ) : (
          <>
            {data.breeds.length === 0 ? (
              <NoResultsPlaceholder />
            ) : (
              <BreedList breeds={data.breeds} onCardClick={handleCardClick} />
            )}
            {!data.isSearch && (
              <Pagination
                itemsOnCurrentPage={data.breeds.length}
                currentPage={data.currentPage}
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
