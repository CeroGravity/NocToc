import { Banner } from "@/components/banner/Banner";
import { Row } from "@/components/row/Row";
import { tmdb } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

export default async function Home() {
  const results = await Promise.allSettled([
    tmdb.netflixOriginals(),
    tmdb.topRated(),
    tmdb.action(),
    tmdb.comedy(),
    tmdb.horror(),
    tmdb.romance(),
    tmdb.documentaries(),
  ]);

  const [
    netflixOriginals,
    topRated,
    action,
    comedy,
    horror,
    romance,
    documentaries,
  ] = results.map((r) => (r.status === "fulfilled" ? r.value : []));

  return (
    <main className="min-h-screen bg-surface-base pb-24">
      <Banner />
      <section className="relative z-10 -mt-16 space-y-6 md:-mt-24">
        <Row title="NocToc Originals" movies={netflixOriginals} />
        <Row title="Top Rated" movies={topRated} />
        <Row title="Action Thrillers" movies={action} />
        <Row title="Comedies" movies={comedy} />
        <Row title="Scary Movies" movies={horror} />
        <Row title="Romance" movies={romance} />
        <Row title="Documentaries" movies={documentaries} />
      </section>
    </main>
  );
}
