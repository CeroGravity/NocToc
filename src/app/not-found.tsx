import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-base px-4 text-center">
      <h1 className="font-display text-6xl font-bold text-brand">404</h1>
      <p className="text-white/60">This title isn&apos;t in our library.</p>
      <Link
        href="/"
        className="rounded-md bg-brand px-5 py-2 font-semibold text-black transition-colors hover:bg-brand-dim"
      >
        Back to home
      </Link>
    </main>
  );
}
