import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useSearchParams } from 'react-router-dom';
import { useBreeds, useInvalidateBreeds } from '@/hooks/queries/dogQueries';
import Home from './Home';

vi.mock('@/components', () => ({
  SearchForm: () => <div data-testid="search-form" />,
  BreedList: ({
    breeds,
    onCardClick,
  }: {
    breeds: { id: number }[];
    onCardClick: (id: number) => void;
  }) => (
    <div data-testid="breed-list">
      Breeds: {breeds.length}
      <button onClick={() => onCardClick(123)}>Select Breed</button>
    </div>
  ),
  Pagination: ({
    currentPage,
    itemsOnCurrentPage,
  }: {
    currentPage: number;
    itemsOnCurrentPage: number;
  }) => (
    <div data-testid="pagination">
      Page: {currentPage}, Items: {itemsOnCurrentPage}
    </div>
  ),
  NoResultsPlaceholder: () => <div data-testid="no-results" />,
  Loader: () => <div data-testid="loader" />,
  Flyout: () => <div data-testid="flyout" />,
  ErrorComponent: ({ onRetry }: { error: Error; onRetry: () => void }) => (
    <div data-testid="error">
      Error!
      <button onClick={onRetry}>Retry</button>
    </div>
  ),
}));

vi.mock('@/hooks/queries/dogQueries', () => ({
  useBreeds: vi.fn(),
  useInvalidateBreeds: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
  Outlet: () => <div data-testid="outlet" />,
}));

describe('Home component', () => {
  let setSearchParamsMock: ReturnType<typeof vi.fn>;
  let searchParams: URLSearchParams;

  const mockUseBreeds = vi.mocked(useBreeds);
  const mockInvalidateBreeds = vi.mocked(useInvalidateBreeds);
  const mockUseSearchParams = useSearchParams as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    setSearchParamsMock = vi.fn();
    searchParams = new URLSearchParams();
    mockUseSearchParams.mockReturnValue([searchParams, setSearchParamsMock]);
    mockInvalidateBreeds.mockReturnValue(vi.fn());
  });

  const mockBreedsData = (overrides = {}) => {
    const base = {
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
      refetch: vi.fn(),
    };
    mockUseBreeds.mockReturnValue({
      ...base,
      ...overrides,
    } as unknown as ReturnType<typeof useBreeds>);
  };

  it('renders loader when loading and no detailId', () => {
    mockBreedsData({ isLoading: true });
    render(<Home />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('breed-list')).not.toBeInTheDocument();
  });

  it('renders error state', () => {
    const retryMock = vi.fn();
    mockBreedsData({
      isError: true,
      error: new Error('Test error'),
      refetch: retryMock,
    });
    render(<Home />);
    expect(screen.getByTestId('error')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Retry'));
    expect(retryMock).toHaveBeenCalled();
  });

  it('renders no results placeholder when no breeds', () => {
    mockBreedsData({ data: [] });
    render(<Home />);
    expect(screen.getByTestId('no-results')).toBeInTheDocument();
  });

  it('renders breeds list and pagination when breeds exist and no search term', () => {
    mockBreedsData({ data: [{ id: 1 }, { id: 2 }] });
    render(<Home />);
    expect(screen.getByTestId('breed-list')).toHaveTextContent('Breeds: 2');
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('hides pagination when search term exists', () => {
    searchParams.set('breed', 'beagle');
    mockBreedsData({ data: [{ id: 1 }] });
    render(<Home />);
    expect(screen.getByTestId('breed-list')).toBeInTheDocument();
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  it('opens detail panel when detailId is present', () => {
    searchParams.set('details', '123');
    mockBreedsData({ data: [{ id: 1 }] });
    render(<Home />);
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
    expect(screen.getByText('×')).toBeInTheDocument();
  });

  it('removes detailId from params when close button is clicked', () => {
    searchParams.set('details', '123');
    mockBreedsData({ data: [{ id: 1 }] });
    render(<Home />);
    fireEvent.click(screen.getByText('×'));
    expect(setSearchParamsMock).toHaveBeenCalled();
    const params = setSearchParamsMock.mock.calls[0][0] as URLSearchParams;
    expect(params.get('details')).toBeNull();
  });

  it('calls invalidateBreeds when refresh button is clicked', () => {
    const invalidateMock = vi.fn();
    mockInvalidateBreeds.mockReturnValue(invalidateMock);
    mockBreedsData();
    render(<Home />);
    fireEvent.click(screen.getByText('🔄 Refresh'));
    expect(invalidateMock).toHaveBeenCalled();
  });

  it('shows spinner in refresh button when fetching but not loading', () => {
    mockBreedsData({ isFetching: true, isLoading: false });
    render(<Home />);
    expect(screen.getByText('', { selector: '.spinner' })).toBeInTheDocument();
  });

  it('always renders Flyout', () => {
    mockBreedsData();
    render(<Home />);
    expect(screen.getByTestId('flyout')).toBeInTheDocument();
  });
});
