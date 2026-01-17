import './ErrorComponentStyles.scss';

interface ErrorComponentProps {
  error: Error | null;
  onRetry: () => void;
}

export default function ErrorComponent({
  error,
  onRetry,
}: ErrorComponentProps) {
  return (
    <div className="error-message">
      <div className="error-message__icon">🐾</div>
      <div className="error-message__text">
        <h2>Oops! Something went wrong...</h2>
        {error?.message && <p>{error.message}</p>}
      </div>
      <button className="error-message__retry" onClick={onRetry}>
        🔄 Try Again
      </button>
    </div>
  );
}
