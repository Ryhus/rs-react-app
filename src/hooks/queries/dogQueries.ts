import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getAllBreeds,
  searchBreeds,
  getBreedById,
} from '@/Services/DogService/DogService';

import type { BreedInfo } from '@/Services/DogService/types';

const ITEMS_ON_PAGE = 10;

export function useBreeds(page: number, searchTerm: string) {
  const isSearch = Boolean(searchTerm?.trim());

  return useQuery<BreedInfo[]>({
    queryKey: ['breeds', { page, searchTerm }],
    queryFn: async () => {
      if (isSearch) {
        return await searchBreeds(searchTerm);
      }
      return await getAllBreeds(ITEMS_ON_PAGE, page);
    },
  });
}

export function useBreedDetails(breedId: string | null) {
  return useQuery<BreedInfo | null>({
    queryKey: ['breed', breedId],
    queryFn: () => (breedId ? getBreedById(breedId) : Promise.resolve(null)),
    enabled: !!breedId,
  });
}

export function useInvalidateBreeds() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['breeds'] });
}
