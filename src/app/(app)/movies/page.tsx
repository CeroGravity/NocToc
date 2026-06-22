import { Row } from "@/components/row/Row";
import { tmdb } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

export default async function MoviesPage() {
  const r = await Promise.allSettled([
    tmdb.popularMovies(), tmdb.topRated(), tmdb.action(),
    tmdb.comedy(), tmdb.horror(), tmdb.romance(),
  ]);
  const [popular, topRated, action, comedy, horror, romance] =
    r.map((x) => (x.status === "fulfilled" ? x.value : []));
  return (
    <main className="min-h-screen bg-surface-base pb-24 pt-24">
      <h1 className="px-4 font-display text-3xl font-bold text-white md:px-10">Movies</h1>
      <div className="mt-6 space-y-6">
        <Row title="Popular" movies={popular} />
        <Row title="Top Rated" movies={topRated} />
        <Row title="Action" movies={action} />
        <Row title="Comedy" movies={comedy} />
        <Row title="Horror" movies={horror} />
        <Row title="Romance" movies={romance} />
      </div>
    </main>
  );
}
