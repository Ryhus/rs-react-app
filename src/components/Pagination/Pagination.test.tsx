import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import Pagination from './Pagination';
import userEvent, { type UserEvent } from '@testing-library/user-event';

const renderPagination = (
  currentPage: number,
  itemsOnCurrentPage: number,
  itemsPerPage?: number
): void => {
  render(
    <MemoryRouter initialEntries={[`/?page=${currentPage + 1}`]}>
      <Routes>
        <Route
          path="/"
          element={
            <Pagination
              currentPage={currentPage}
              itemsOnCurrentPage={itemsOnCurrentPage}
              itemsPerPage={itemsPerPage}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

describe('Pagination component', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders Prev and Next links', (): void => {
    renderPagination(0, 10, 10);

    const prev = screen.getByRole('link', { name: /prev/i });
    const next = screen.getByRole('link', { name: /next/i });

    expect(prev).toBeInTheDocument();
    expect(next).toBeInTheDocument();
  });

  it('disables Prev on the first page', (): void => {
    renderPagination(0, 10, 10);

    const prev = screen.getByRole('link', { name: /prev/i });
    expect(prev).toHaveClass('disabled');
    expect(prev).toHaveAttribute('aria-disabled', 'true');
  });

  it('disables Next on the last page', (): void => {
    renderPagination(2, 5, 10);

    const next = screen.getByRole('link', { name: /next/i });
    expect(next).toHaveClass('disabled');
    expect(next).toHaveAttribute('aria-disabled', 'true');
  });

  it('navigates to next and previous pages', async (): Promise<void> => {
    renderPagination(1, 10, 10);

    const prev = screen.getByRole('link', { name: /prev/i });
    const next = screen.getByRole('link', { name: /next/i });

    expect(prev).toHaveAttribute('href', '/?page=1');
    expect(next).toHaveAttribute('href', '/?page=3');

    await user.click(next);
    await user.click(prev);
  });
});
