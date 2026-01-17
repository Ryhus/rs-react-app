import { describe, it, expect } from 'vitest';
import { getPaginationPages } from './pagination';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

describe('getPaginationPages', () => {
  it('returns full range when totalPages is less than or equal to totalBlocks', () => {
    expect(getPaginationPages(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationPages(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('returns correct pages with no left spill but right spill', () => {
    const result = getPaginationPages(2, 20, 2);
    expect(result[0]).toBe(1);
    expect(result[result.length - 1]).toBe(20);
    expect(result).toContain(RIGHT_PAGE);
    expect(result).not.toContain(LEFT_PAGE);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, RIGHT_PAGE, 20]);
  });

  it('returns correct pages with left spill but no right spill', () => {
    const result = getPaginationPages(19, 20, 2);
    expect(result[0]).toBe(1);
    expect(result[result.length - 1]).toBe(20);
    expect(result).toContain(LEFT_PAGE);
    expect(result).not.toContain(RIGHT_PAGE);

    expect(result).toEqual([1, LEFT_PAGE, 14, 15, 16, 17, 18, 19, 20]);
  });

  it('returns correct pages with both left and right spill', () => {
    const result = getPaginationPages(10, 20, 2);
    expect(result[0]).toBe(1);
    expect(result[result.length - 1]).toBe(20);
    expect(result).toContain(LEFT_PAGE);
    expect(result).toContain(RIGHT_PAGE);

    expect(result).toEqual([1, LEFT_PAGE, 8, 9, 10, 11, 12, RIGHT_PAGE, 20]);
  });

  it('returns only numbers when totalPages is very small', () => {
    expect(getPaginationPages(1, 1)).toEqual([1]);
    expect(getPaginationPages(1, 2)).toEqual([1, 2]);
  });

  it('uses default pageNeighbours value if not provided', () => {
    const resultWithDefault = getPaginationPages(10, 20);
    const resultWithExplicit = getPaginationPages(10, 20, 2);
    expect(resultWithDefault).toEqual(resultWithExplicit);
  });
});
