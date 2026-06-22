import { Row } from "@/components/row/Row";
import { tmdb } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

export default async function NewPage() {
  const r = await Promise.allSettled([
    tmdb.trending(), tmdb.nowPlaying(), tmdb.upcoming(), tmdb.popularMovies(),
  ]);
  const [trending, nowPlaying, upcoming, popular] =
    r.map((x) => (x.status === "fulfilled" ? x.value : []));
  return (
    <main className="min-h-screen bg-surface-base pb-24 pt-24">
      <h1 className="px-4 font-display text-3xl font-bold text-white md:px-10">New &amp; Popular</h1>
      <div className="mt-6 space-y-6">
        <Row title="Trending Now" movies={trending} />
        <Row title="Now Playing" movies={nowPlaying} />
        <Row title="Coming Soon" movies={upcoming} />
        <Row title="Popular" movies={popular} />
      </div>
    </main>
  );
}
