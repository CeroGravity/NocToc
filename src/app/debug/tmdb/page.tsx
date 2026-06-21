import { tmdb, isTmdbConfigured } from "@/lib/tmdb";
import type { Movie } from "@/types/tmdb";

export const dynamic = "force-dynamic";

export default async function TmdbDebugPage() {
  if (!isTmdbConfigured) {
    return (
      <main className="min-h-screen bg-surface-base p-8 text-white">
        <h1 className="font-display text-2xl text-brand">TMDB debug</h1>
        <p className="mt-4 text-white/60">
          TMDB_API_KEY is not set. Add it to .env.local and restart dev.
        </p>
      </main>
    );
  }

  // Keep only the data fetch inside try/catch so a JSX render error is not
  // silently swallowed (react-hooks/error-boundaries). Return JSX afterward.
  let trending: Movie[];
  let topRated: Movie[];
  try {
    [trending, topRated] = await Promise.all([tmdb.trending(), tmdb.topRated()]);
  } catch (err) {
    return (
      <main className="min-h-screen bg-surface-base p-8 text-white">
        <h1 className="font-display text-2xl text-brand">TMDB debug</h1>
        <p className="mt-4 text-red-400">
          Fetch failed: {err instanceof Error ? err.message : "unknown error"}
        </p>
        <p className="mt-2 text-white/50">Check that TMDB_API_KEY is a valid v3 key.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface-base p-8 text-white">
      <h1 className="font-display text-2xl text-brand">TMDB debug</h1>
      <p className="mt-2 text-sm text-white/50">
        Data layer live. Trending: {trending.length} · Top rated: {topRated.length}
      </p>
      <section className="mt-6">
        <h2 className="text-lg font-semibold">Trending this week</h2>
        <ul className="mt-2 space-y-1 text-sm text-white/70">
          {trending.slice(0, 10).map((m) => (
            <li key={m.id}>
              {m.title ?? m.name ?? "Untitled"} — ⭐ {m.vote_average.toFixed(1)}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
