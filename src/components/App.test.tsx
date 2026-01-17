import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import * as DogService from '../Services/DogService/DogService';

import App from '../App';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import type { Breed } from '../Services/DogService/types';

vi.mock('../Services/DogService/DogService');

const mockedGetAllBreeds = DogService.getAllBreeds as Mock;
const mockedSearchBreeds = DogService.searchBreeds as Mock;

const mockBreeds: Breed[] = [
  {
    id: '1',
    name: 'Beagle',
    image: { id: 'img1', width: 500, height: 500, url: 'beagle.jpg' },
  },
  {
    id: '2',
    name: 'Labrador',
    image: { id: 'img2', width: 500, height: 500, url: 'labrador.jpg' },
  },
];

describe('App Component Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('makes initial API call on mount with no saved search term', async () => {
    mockedGetAllBreeds.mockResolvedValueOnce(mockBreeds);

    render(<App />);

    expect(mockedGetAllBreeds).toHaveBeenCalledTimes(1);

    expect(
      screen.getByText(/looking for your favorite dog breed/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getAllByRole('heading', { level: 2, name: /beagle|labrador/i })
      ).toHaveLength(2);
    });
  });

  it('uses localStorage search term if available and calls searchBreeds', async () => {
    localStorage.setItem('lastSearchTerm', 'beagle');
    mockedSearchBreeds.mockResolvedValueOnce(mockBreeds);

    render(<App />);

    expect(mockedSearchBreeds).toHaveBeenCalledWith('beagle');

    await waitFor(() => {
      expect(
        screen.getAllByRole('heading', { level: 2, name: /beagle|labrador/i })
      ).toHaveLength(2);
    });
  });

  it('handles API error on mount', async () => {
    mockedGetAllBreeds.mockRejectedValueOnce(new Error('API Failure'));

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText(/failed to load dog breeds/i)
      ).toBeInTheDocument();
    });
  });

  it('searches breeds using SearchForm', async () => {
    mockedGetAllBreeds.mockResolvedValueOnce(mockBreeds);
    mockedSearchBreeds.mockResolvedValueOnce([mockBreeds[0]]);

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getAllByRole('heading', { level: 2, name: /beagle|labrador/i })
      ).toHaveLength(2);
    });

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'beagle');
    await userEvent.click(searchButton);

    await waitFor(() => {
      expect(mockedSearchBreeds).toHaveBeenCalledWith('beagle');
    });

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /beagle/i })
      ).toBeInTheDocument();
    });
  });

  it('trigger error button throws error', async () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    const errorButton = screen.getByRole('button', { name: /trigger error/i });
    await userEvent.click(errorButton);

    expect(screen.getByText(/oops! something went wrong/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
  });

  it('displays NoResultsPlaceholder when search returns no breeds', async () => {
    mockedGetAllBreeds.mockResolvedValueOnce([]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/No dogs found 😞/i)).toBeInTheDocument();
    });
  });
});
