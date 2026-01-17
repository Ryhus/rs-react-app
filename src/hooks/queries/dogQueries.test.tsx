import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import { vi, it, describe, expect, afterEach } from 'vitest';

import { useBreeds, useBreedDetails, useInvalidateBreeds } from './dogQueries';

const mockDogService = vi.hoisted(() => ({
  getAllBreeds: vi.fn(),
  searchBreeds: vi.fn(),
  getBreedById: vi.fn(),
}));

vi.mock('@/Services/DogService/DogService', () => mockDogService);

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@tanstack/react-query')>();
  return {
    ...mod,
    useQueryClient: vi.fn(),
  };
});

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe('dogQueries hooks', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('useBreeds', () => {
    it('calls getAllBreeds when no search term', async () => {
      const breedsMock = [{ id: 1, name: 'Breed 1' }];
      mockDogService.getAllBreeds.mockResolvedValue(breedsMock);

      const { result } = renderHook(() => useBreeds(2, ''), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(mockDogService.getAllBreeds).toHaveBeenCalledWith(10, 2);
      expect(mockDogService.searchBreeds).not.toHaveBeenCalled();
      expect(result.current.data).toEqual(breedsMock);
    });

    it('calls searchBreeds when search term is present', async () => {
      const breedsMock = [{ id: 42, name: 'Search Breed' }];
      mockDogService.searchBreeds.mockResolvedValue(breedsMock);

      const { result } = renderHook(() => useBreeds(1, 'beagle'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(mockDogService.searchBreeds).toHaveBeenCalledWith('beagle');
      expect(mockDogService.getAllBreeds).not.toHaveBeenCalled();
      expect(result.current.data).toEqual(breedsMock);
    });
  });

  describe('useBreedDetails', () => {
    it('returns undefined immediately if breedId is null', async () => {
      const { result } = renderHook(() => useBreedDetails(null), {
        wrapper: createWrapper(),
      });

      expect(result.current.data).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
    });

    it('calls getBreedById when breedId is provided', async () => {
      const breedDetail = { id: 123, name: 'Bulldog' };
      mockDogService.getBreedById.mockResolvedValue(breedDetail);

      const { result } = renderHook(() => useBreedDetails('123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(mockDogService.getBreedById).toHaveBeenCalledWith('123');
      expect(result.current.data).toEqual(breedDetail);
    });
  });

  describe('useInvalidateBreeds', () => {
    it('calls invalidateQueries on queryClient with correct key', () => {
      const invalidateQueriesMock = vi.fn();

      const mockQueryClient = {
        invalidateQueries: invalidateQueriesMock,
      } as Partial<QueryClient>;

      const queryClient = Object.create(QueryClient.prototype);
      Object.assign(queryClient, mockQueryClient);

      const useQueryClientMock = vi.mocked(useQueryClient);
      useQueryClientMock.mockReturnValue(queryClient as QueryClient);

      const { result } = renderHook(() => useInvalidateBreeds(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current();
      });

      expect(invalidateQueriesMock).toHaveBeenCalledWith({
        queryKey: ['breeds'],
      });
    });
  });
});
