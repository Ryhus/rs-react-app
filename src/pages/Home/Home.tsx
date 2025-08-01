import {
  useLoaderData,
  useNavigation,
  useSearchParams,
  Outlet,
} from 'react-router-dom';

import SearchForm from '../../components/SearchForm/SearchForm';
import BreedList from '../../components/BreedList/BreedList';
import Pagination from '../../components/Pagination/Pagination';
import NoResultsPlaceholder from '../../components/NoResultsPlaceholder/NoResultsPlaceholder';

import { type AllBreedsLoaderData } from '../../routes/DataHandlers/Home/HomeLoaders';

import './HomeStyles.scss';
import Loader from '../../components/Loader/Loader';

function Home() {
  const data = useLoaderData<AllBreedsLoaderData>();
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get('page'));

  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  const detailId = searchParams.get('details');

  const handleCardClick = (breedId: string) => {
    searchParams.append('details', breedId);
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
        {isLoading ? (
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
