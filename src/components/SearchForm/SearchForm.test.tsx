import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import SearchForm from './SearchForm';
import * as DogService from '../../Services/DogService/DogService';

describe('SearchForm', () => {
  const onSearch = vi.fn();

  beforeEach(() => {
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('');
    vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(
      () => {}
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    onSearch.mockClear();
  });

  it('renders search input and search button', () => {
    render(<SearchForm onSearch={onSearch} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('displays previously saved search term from localStorage on mount', () => {
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(
      'Poodle'
    );
    render(<SearchForm onSearch={onSearch} />);
    expect(screen.getByRole('textbox')).toHaveValue('Poodle');
  });

  it('shows empty input when no saved term exists', () => {
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('');
    render(<SearchForm onSearch={onSearch} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={onSearch} />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'beagle');

    expect(input).toHaveValue('beagle');
  });

  it('triggers search callback with correct parameters', async () => {
    const user = userEvent.setup();
    const mockResult = [{ name: 'Beagle' }];

    vi.spyOn(DogService, 'searchBreeds').mockResolvedValue(mockResult);

    render(<SearchForm onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'Beagle');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalled();
    });
  });

  it('retrieves saved search term on component mount', () => {
    const getItemSpy = vi
      .spyOn(window.localStorage.__proto__, 'getItem')
      .mockReturnValue('Labrador');

    render(<SearchForm onSearch={onSearch} />);

    expect(getItemSpy).toHaveBeenCalledWith('lastSearchTerm');
    expect(screen.getByRole('textbox')).toHaveValue('Labrador');
  });

  it('calls getAllBreeds when input is empty', async () => {
    const user = userEvent.setup();

    const mockBreeds = [{ name: 'Pug' }];
    vi.spyOn(DogService, 'getAllBreeds').mockResolvedValue(mockBreeds);

    render(<SearchForm onSearch={onSearch} />);

    await user.clear(screen.getByRole('textbox'));
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith(mockBreeds);
    });
  });

  it('shows error when getAllBreeds fails', async () => {
    const user = userEvent.setup();

    vi.spyOn(DogService, 'getAllBreeds').mockRejectedValue(
      new Error('Network Error')
    );

    render(<SearchForm onSearch={onSearch} />);

    await user.clear(screen.getByRole('textbox'));
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to load dog breeds/i)
      ).toBeInTheDocument();
    });
  });

  it('shows generic error message when non-Error is thrown', async () => {
    vi.spyOn(DogService, 'getAllBreeds').mockRejectedValue(
      'Non-error rejection'
    );

    render(<SearchForm onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);

    const submitButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(submitButton);

    const errorMessage = await screen.findByText(
      /Something went wrong\. Please try again\./i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('clears the input and error when clear button is clicked', async () => {
    render(<SearchForm onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    const clearButton = screen.getByRole('button', { name: /✖/i });

    await userEvent.type(input, 'Husky');
    expect(input).toHaveValue('Husky');

    await userEvent.click(clearButton);

    expect(input).toHaveValue('');

    const errorMessage = screen.queryByText(/something went wrong/i);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
