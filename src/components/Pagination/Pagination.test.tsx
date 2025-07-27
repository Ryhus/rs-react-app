import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, type Mock } from 'vitest';
import Pagination from './Pagination';
import * as paginationUtils from '../../utils/pagination';

vi.mock('../../utils/pagination', () => ({
  getPaginationPages: vi.fn(),
}));

const mockedGetPaginationPages = paginationUtils.getPaginationPages as Mock;

describe('Pagination component', () => {
  const renderPagination = (
    page: number,
    totalPages: number,
    pageNeighbours = 1
  ) => {
    return render(
      <MemoryRouter initialEntries={[`/?page=${page}`]}>
        <Routes>
          <Route
            path="/"
            element={
              <Pagination
                totalPages={totalPages}
                pageNeighbours={pageNeighbours}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders basic pagination with active and disabled links', () => {
    mockedGetPaginationPages.mockReturnValue([1, 'RIGHT', 10]);

    renderPagination(1, 10, 1);

    expect(screen.getByText('Prev')).toHaveClass('disabled');
    expect(screen.getByText('1')).toHaveClass('active');
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getAllByText('...')).toHaveLength(1);
    expect(screen.getByText('Next')).not.toHaveClass('disabled');

    expect(screen.getByText('Prev').closest('a')).toHaveAttribute(
      'href',
      '/?page=1'
    );
    expect(screen.getByText('Next').closest('a')).toHaveAttribute(
      'href',
      '/?page=2'
    );
    expect(screen.getByText('10').closest('a')).toHaveAttribute(
      'href',
      '/?page=10'
    );
    expect(screen.getByText('...').closest('a')).toHaveAttribute(
      'href',
      '/?page=4'
    );
  });

  it('disables Next on last page', () => {
    mockedGetPaginationPages.mockReturnValue(['LEFT', 9, 10]);

    renderPagination(10, 10, 1);

    expect(screen.getByText('Next')).toHaveClass('disabled');
    expect(screen.getByText('Prev')).not.toHaveClass('disabled');
    expect(screen.getByText('...').closest('a')).toHaveAttribute(
      'href',
      '/?page=7'
    );
  });

  it('shows correct active page in the middle', () => {
    mockedGetPaginationPages.mockReturnValue(['LEFT', 4, 5, 6, 'RIGHT']);

    renderPagination(5, 10, 1);

    expect(screen.getByText('5')).toHaveClass('active');
    expect(screen.getByText('4')).not.toHaveClass('active');
    expect(screen.getByText('6')).not.toHaveClass('active');

    const ellipses = screen.getAllByText('...');
    expect(ellipses).toHaveLength(2);
    expect(ellipses[0].closest('a')).toHaveAttribute('href', '/?page=2');
    expect(ellipses[1].closest('a')).toHaveAttribute('href', '/?page=8');
  });

  it('renders correctly when only one page exists', () => {
    mockedGetPaginationPages.mockReturnValue([1]);

    renderPagination(1, 1);

    expect(screen.getByText('1')).toHaveClass('active');
    expect(screen.getByText('Prev')).toHaveClass('disabled');
    expect(screen.getByText('Next')).toHaveClass('disabled');
  });
});
