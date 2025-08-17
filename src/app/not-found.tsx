import Link from 'next/link';

import './PageNotFoundStyles.scss';

function PageNotFound() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Uh-oh! Dog not found 🐾</h2>
      <div className="not-found-img" data-testid="not-found-img" />
      <p>The page you are sniffing for does not exist.</p>
      <Link className="not-found-link" href={'/'}>
        Go Home
      </Link>
    </div>
  );
}

export default PageNotFound;
