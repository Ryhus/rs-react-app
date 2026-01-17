const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

type PageType = number | typeof LEFT_PAGE | typeof RIGHT_PAGE;

const range = (from: number, to: number, step = 1): number[] => {
  const output: number[] = [];
  for (let i = from; i <= to; i += step) {
    output.push(i);
  }
  return output;
};

export function getPaginationPages(
  currentPage: number,
  totalPages: number,
  pageNeighbours: number = 2
): PageType[] {
  const totalNumbers = pageNeighbours * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    let pages: PageType[] = [];

    const leftBound = Math.max(2, currentPage - pageNeighbours);
    const rightBound = Math.min(totalPages - 1, currentPage + pageNeighbours);
    const hasLeftSpill = leftBound > 2;
    const hasRightSpill = rightBound < totalPages - 1;

    if (!hasLeftSpill && hasRightSpill) {
      const leftRange = range(2, 3 + 2 * pageNeighbours);
      pages = [...leftRange, RIGHT_PAGE];
    } else if (hasLeftSpill && !hasRightSpill) {
      const rightRange = range(
        totalPages - (3 + 2 * pageNeighbours) + 1,
        totalPages - 1
      );
      pages = [LEFT_PAGE, ...rightRange];
    } else {
      const middleRange = range(leftBound, rightBound);
      pages = [LEFT_PAGE, ...middleRange, RIGHT_PAGE];
    }

    return [1, ...pages, totalPages];
  }

  return range(1, totalPages);
}
