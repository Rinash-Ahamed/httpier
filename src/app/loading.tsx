export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-2.5" role="status" aria-label="Loading">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-blue)]" />
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-cyan)]"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-violet)]"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}
