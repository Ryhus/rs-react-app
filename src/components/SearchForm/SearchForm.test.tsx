import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import SearchForm from './SearchForm';

function renderSearchForm(initialEntries = ['/']) {
  const router = createMemoryRouter([{ path: '/', element: <SearchForm /> }], {
    initialEntries,
  });
  return render(<RouterProvider router={router} />);
}

describe('SearchForm', () => {
  beforeEach(() => {
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('');
    vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(
      () => {}
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders input, clear button, and search button', () => {
    renderSearchForm();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /×/i })).toBeInTheDocument();
  });

  it('loads the saved search term from localStorage on mount', () => {
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(
      'Labrador'
    );
    renderSearchForm();
    expect(window.localStorage.getItem).toHaveBeenCalledWith('lastSearchTerm');
    expect(screen.getByRole('textbox')).toHaveValue('Labrador');
  });

  it('starts with empty input if no saved term', () => {
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('');
    renderSearchForm();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('updates the input value when user types', async () => {
    renderSearchForm();
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');
    await user.type(input, 'beagle');
    expect(input).toHaveValue('beagle');
  });

  it('clears the input and error when clear button is clicked', async () => {
    renderSearchForm();
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');
    const clearButton = screen.getByRole('button', { name: /×/i });

    await user.type(input, 'Husky');
    expect(input).toHaveValue('Husky');

    await user.click(clearButton);
    expect(input).toHaveValue('');
  });

  it('does not show error message initially', () => {
    renderSearchForm();
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });
});
