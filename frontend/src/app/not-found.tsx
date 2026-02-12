import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 animate-bounce-in">
      <span className="text-5xl">🔍</span>
      <h2 className="text-2xl font-heading font-bold">Not Found</h2>
      <p className="text-foreground/40">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="btn-primary">
        Go home 🏠
      </Link>
    </div>
  );
}
