import {
  getAllBreeds,
  searchBreeds,
  getBreedById,
} from '../../../Services/DogService/DogService';

import { type BreedInfo } from '../../../Services/DogService/types';
import type {
  LoaderFunctionArgs,
  ShouldRevalidateFunctionArgs,
} from 'react-router-dom';

export interface AllBreedsLoaderData {
  breeds: BreedInfo[];
  currentPage: number;
  isSearch: boolean;
}

export async function allBreedsLoader({
  request,
}: LoaderFunctionArgs): Promise<AllBreedsLoaderData> {
  const ITEMS_ON_PAGE = 10;
  const lastSearchTerm = localStorage.getItem('lastSearchTerm');

  const url = new URL(request.url);
  const breed = url.searchParams.get('breed')?.trim() ?? lastSearchTerm ?? '';
  const uiPage = Number(url.searchParams.get('page')) || 1;
  const currentPage = uiPage - 1;

  if (!lastSearchTerm || lastSearchTerm === '' || breed === '') {
    const breeds = await getAllBreeds(ITEMS_ON_PAGE, currentPage);
    return { breeds, currentPage, isSearch: false };
  } else {
    const breeds = breed ? await searchBreeds(breed) : [];
    return { breeds, currentPage: 0, isSearch: true };
  }
}

export async function breedDetailsLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const detailedId = url.searchParams.get('details');
  if (!detailedId) return null;
  const breedDetails = await getBreedById(detailedId);
  return breedDetails;
}

export function revalidateHomeRoute({
  currentUrl,
  nextUrl,
}: ShouldRevalidateFunctionArgs) {
  const cur = new URL(currentUrl.href);
  const next = new URL(nextUrl.href);

  cur.searchParams.delete('details');
  next.searchParams.delete('details');

  return cur.toString() !== next.toString();
}
