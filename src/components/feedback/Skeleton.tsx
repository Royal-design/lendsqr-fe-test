export function SkeletonTable() {
  return (
    <div className="skeleton" aria-label="Loading users">
      {Array.from({ length: 8 }, (_, index) => (
        <div className="skeleton__row" key={index} />
      ))}
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="error-state" role="alert">
      <h2>Unable to load data</h2>
      <p>{message}</p>
    </div>
  );
}
