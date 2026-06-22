import { Row } from "@/components/row/Row";
import { tmdb } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

export default async function TvPage() {
  const r = await Promise.allSettled([
    tmdb.popularTv(), tmdb.topRatedTv(), tmdb.onTheAir(),
    tmdb.netflixOriginals(), tmdb.trendingTv(),
  ]);
  const [popular, topRated, onAir, originals, trending] =
    r.map((x) => (x.status === "fulfilled" ? x.value : []));
  return (
    <main className="min-h-screen bg-surface-base pb-24 pt-24">
      <h1 className="px-4 font-display text-3xl font-bold text-white md:px-10">TV Shows</h1>
      <div className="mt-6 space-y-6">
        <Row title="Popular" movies={popular} />
        <Row title="Top Rated" movies={topRated} />
        <Row title="On The Air" movies={onAir} />
        <Row title="NocToc Originals" movies={originals} />
        <Row title="Trending" movies={trending} />
      </div>
    </main>
  );
}
