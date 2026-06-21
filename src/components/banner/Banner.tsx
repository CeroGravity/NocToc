import { tmdb, tmdbImage } from "@/lib/tmdb";
import { resolveTrailer } from "@/lib/trailers";
import { BannerMedia } from "./BannerMedia";
import type { Movie } from "@/types/tmdb";

// Picking a random index is an impure operation; keep it out of the component
// body so React's purity rules are satisfied. The Banner is rendered
// dynamically (see `dynamic` export on the page) so this runs per request.
function pickRandom<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  return items[Math.floor(Math.random() * items.length)];
}

export async function Banner() {
  let featured: Movie | null = null;
  try {
    const trending = await tmdb.trending();
    const candidates = trending.filter((m) => m.backdrop_path);
    featured = pickRandom(candidates);
  } catch {
    featured = null;
  }

  if (!featured) {
    return (
      <section className="relative h-[56vw] max-h-[85vh] min-h-[460px] w-full bg-surface-raised" />
    );
  }

  const backdrop = tmdbImage(featured.backdrop_path, "original");
  const trailer = resolveTrailer(featured.id);
  const title = featured.title ?? featured.name ?? "Untitled";

  return (
    <BannerMedia
      title={title}
      overview={featured.overview}
      backdrop={backdrop}
      trailer={trailer}
    />
  );
}
