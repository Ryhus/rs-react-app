import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from 'react-router-dom';
import Home from './Home';

interface AllBreedsLoaderData {
  breeds: { id: number }[];
  isSearch: boolean;
  currentPage: number;
}

vi.mock('../../components/SearchForm/SearchForm', () => ({
  default: () => <div data-testid="search-form" />,
}));
vi.mock('../../components/BreedList/BreedList', () => ({
  default: (props: {
    breeds: { id: number }[];
    onCardClick: (id: number) => void;
  }) => (
    <div data-testid="breed-list">
      Breeds: {props.breeds.length}
      <button onClick={() => props.onCardClick(123)}>Select Breed 123</button>
    </div>
  ),
}));
vi.mock('../../components/Pagination/Pagination', () => ({
  default: (props: { currentPage: number; itemsOnCurrentPage: number }) => (
    <div data-testid="pagination">
      Page: {props.currentPage}, Items: {props.itemsOnCurrentPage}
    </div>
  ),
}));
vi.mock('../../components/NoResultsPlaceholder/NoResultsPlaceholder', () => ({
  default: () => <div data-testid="no-results" />,
}));
vi.mock('../../components/Loader/Loader', () => ({
  default: () => <div data-testid="loader" />,
}));
vi.mock('@/components/Flyout/Flyout', () => ({
  default: () => <div data-testid="flyout" />,
}));

vi.mock('react-router-dom', () => {
  return {
    useLoaderData: vi.fn(),
    useNavigation: vi.fn(),
    useSearchParams: vi.fn(),
    Outlet: () => <div data-testid="outlet" />,
  };
});

describe('Home component', () => {
  let setSearchParamsMock: ReturnType<typeof vi.fn>;
  let searchParams: URLSearchParams;

  beforeEach(() => {
    setSearchParamsMock = vi.fn();
    searchParams = new URLSearchParams();

    (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      searchParams,
      setSearchParamsMock,
    ]);
  });

  it('shows loader in master when loading and no detailId', () => {
    const loaderData: AllBreedsLoaderData = {
      breeds: [],
      isSearch: false,
      currentPage: 1,
    };
    (useLoaderData as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      loaderData
    );
    (useNavigation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: 'loading',
    });

    render(<Home />);

    expect(screen.getByTestId('loader')).toBeDefined();
    expect(screen.queryByTestId('no-results')).toBeNull();
    expect(screen.queryByTestId('breed-list')).toBeNull();
  });

  it('shows NoResultsPlaceholder if no breeds and not loading', () => {
    const loaderData: AllBreedsLoaderData = {
      breeds: [],
      isSearch: false,
      currentPage: 1,
    };
    (useLoaderData as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      loaderData
    );
    (useNavigation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: 'idle',
    });

    render(<Home />);

    expect(screen.getByTestId('no-results')).toBeDefined();
  });

  it('shows BreedList and Pagination when breeds exist and not search', () => {
    const loaderData: AllBreedsLoaderData = {
      breeds: [{ id: 1 }, { id: 2 }],
      isSearch: false,
      currentPage: 2,
    };
    (useLoaderData as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      loaderData
    );
    (useNavigation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: 'idle',
    });

    render(<Home />);

    expect(screen.getByTestId('breed-list')).toHaveTextContent('Breeds: 2');
    expect(screen.getByTestId('pagination')).toHaveTextContent('Page: 2');
  });

  it('does not show Pagination if isSearch is true', () => {
    const loaderData: AllBreedsLoaderData = {
      breeds: [{ id: 1 }],
      isSearch: true,
      currentPage: 1,
    };
    (useLoaderData as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      loaderData
    );
    (useNavigation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: 'idle',
    });

    render(<Home />);

    expect(screen.getByTestId('breed-list')).toBeDefined();
    expect(screen.queryByTestId('pagination')).toBeNull();
  });

  it('shows detail panel with close button and Outlet when detailId present and not loading', () => {
    searchParams.set('details', '123');
    const loaderData: AllBreedsLoaderData = {
      breeds: [{ id: 1 }],
      isSearch: false,
      currentPage: 1,
    };
    (useLoaderData as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      loaderData
    );
    (useNavigation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: 'idle',
    });

    render(<Home />);

    expect(screen.getByText('×')).toBeDefined();
    expect(screen.getByTestId('outlet')).toBeDefined();
  });

  it('clicking close button removes detailId from searchParams', () => {
    searchParams.set('details', '123');
    const loaderData: AllBreedsLoaderData = {
      breeds: [{ id: 1 }],
      isSearch: false,
      currentPage: 1,
    };
    (useLoaderData as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      loaderData
    );
    (useNavigation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: 'idle',
    });

    render(<Home />);

    fireEvent.click(screen.getByText('×'));

    expect(setSearchParamsMock).toHaveBeenCalled();

    const calledParams = setSearchParamsMock.mock
      .calls[0][0] as URLSearchParams;
    expect(calledParams.get('details')).toBeNull();
  });

  it('always renders Flyout component', () => {
    const loaderData: AllBreedsLoaderData = {
      breeds: [],
      isSearch: false,
      currentPage: 1,
    };
    (useLoaderData as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      loaderData
    );
    (useNavigation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: 'idle',
    });

    render(<Home />);

    expect(screen.getByTestId('flyout')).toBeDefined();
  });
});
