import apiClient from './apiClient';

import type { SearchBreedResponse, Breed } from './types';

export async function getAllBreeds(limit: number = 10, page: number = 0) {
  const response = await apiClient.get<SearchBreedResponse>(`/breeds`, {
    params: { limit, page },
  });
  return response.data;
}

export async function searchBreeds(q: string) {
  const response = await apiClient.get<SearchBreedResponse>(`/breeds/search`, {
    params: { q },
  });
  return response.data;
}

export async function getBreedById(breedId: string) {
  const response = await apiClient.get<Breed>(`/breeds/`, {
    params: { breedId },
  });
  return response.data;
}
