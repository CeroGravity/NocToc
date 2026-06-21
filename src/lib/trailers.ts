// Self-hosted trailers served from /public. No YouTube, no external embeds.
// Map a TMDB id to a local file you've placed under public/trailers/.
export const LOCAL_TRAILERS: Record<number, string> = {
  // 1087192: "/trailers/1087192.mp4",
};

// Optional ambient hero loop. Plays when the featured title has no per-title trailer.
// Drop any .mp4 at public/trailers/ambient.mp4 and set this to "/trailers/ambient.mp4".
export const AMBIENT_TRAILER: string | null = null;

export function resolveTrailer(movieId: number): string | null {
  return LOCAL_TRAILERS[movieId] ?? AMBIENT_TRAILER;
}
