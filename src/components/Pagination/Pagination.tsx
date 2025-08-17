'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

import './PagintationStyles.scss';

interface PaginationProps {
  currentPage: number;
  itemsOnCurrentPage: number;
  itemsPerPage?: number;
  disableNextBttn?: boolean;
}

function Pagination({
  currentPage,
  itemsOnCurrentPage,
  itemsPerPage = 10,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isFirstPage = currentPage === 0;
  const isLastPage = itemsOnCurrentPage < itemsPerPage;

  const createLink = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(page + 1));
    return `${pathname}?${newParams.toString()}`;
  };

  return (
    <nav className="pagination-container">
      <ul className="pagination-list">
        <li>
          <Link
            className={`page-link ${isFirstPage ? 'disabled' : ''}`}
            href={createLink(currentPage - 1)}
            aria-disabled={isFirstPage}
            onClick={(e) => isFirstPage && e.preventDefault()}
          >
            Prev
          </Link>
        </li>

        <li>
          <Link
            className={`page-link ${isLastPage ? 'disabled' : ''}`}
            href={createLink(currentPage + 1)}
            aria-disabled={isLastPage}
            onClick={(e) => isLastPage && e.preventDefault()}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
