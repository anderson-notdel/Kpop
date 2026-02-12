"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }; // required by Next.js error boundary
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 animate-bounce-in">
      <span className="text-5xl">😥</span>
      <h2 className="text-xl font-heading font-semibold">Something went wrong</h2>
      <p className="text-foreground/40">Failed to load content. Please try again.</p>
      <button onClick={reset} className="btn-primary">
        Try again 🔄
      </button>
    </div>
  );
}
