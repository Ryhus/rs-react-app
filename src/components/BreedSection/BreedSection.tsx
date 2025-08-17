import { BreedList, Pagination, NoResultsPlaceholder } from '@/components';

import { getAllBreeds } from '@/Services/DogService/DogService';

export default async function BreedSection({ page }: { page: number }) {
  const breeds = await getAllBreeds(10, page);

  if (breeds.length === 0) return <NoResultsPlaceholder />;

  return (
    <>
      <BreedList breeds={breeds} breedId={1} />
      <Pagination itemsOnCurrentPage={breeds.length} currentPage={page} />
    </>
  );
}
