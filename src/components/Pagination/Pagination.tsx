import { Link, useSearchParams } from 'react-router-dom';
import { getPaginationPages } from '../../utils/pagination';

import './PagintationStyles.scss';

interface PaginationProps {
  totalPages: number;
  pageNeighbours?: number;
}

function Pagination({ totalPages, pageNeighbours = 2 }: PaginationProps) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const pages = getPaginationPages(currentPage, totalPages, pageNeighbours);

  const handleMoveLeft = () =>
    `?page=${Math.max(1, currentPage - (pageNeighbours * 2 + 1))}`;

  const handleMoveRight = () =>
    `?page=${Math.min(totalPages, currentPage + (pageNeighbours * 2 + 1))}`;

  return (
    <nav className="pagination-container">
      <ul className="pagination-list">
        <li>
          <Link
            className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
            to={`?page=${Math.max(1, currentPage - 1)}`}
          >
            Prev
          </Link>
        </li>

        {pages.map((page, index) => {
          if (page === 'LEFT') {
            return (
              <li key={index}>
                <Link className="page-link" to={handleMoveLeft()}>
                  ...
                </Link>
              </li>
            );
          }

          if (page === 'RIGHT') {
            return (
              <li key={index}>
                <Link className="page-link" to={handleMoveRight()}>
                  ...
                </Link>
              </li>
            );
          }

          return (
            <li key={index}>
              <Link
                className={`page-link ${currentPage === page ? 'active' : ''}`}
                to={`?page=${page}`}
              >
                {page}
              </Link>
            </li>
          );
        })}

        <li>
          <Link
            className={`page-link ${currentPage === totalPages ? 'disabled' : ''}`}
            to={`?page=${Math.min(totalPages, currentPage + 1)}`}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
