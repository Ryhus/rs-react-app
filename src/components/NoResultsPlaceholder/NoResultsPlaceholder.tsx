import './NoResultsPlaceholder.scss';

function NoResultsPlaceholder() {
  return (
    <div
      className="no-results-placeholder"
      data-testid="no-results-placeholder"
    >
      <div className="icon">🐾</div>
      <h2>No dogs found 😞</h2>
      <p>
        We couldn&apos;t find any dog breeds matching your request. Please try a
        different name or check your spelling or internet connection.
      </p>
    </div>
  );
}

export default NoResultsPlaceholder;
