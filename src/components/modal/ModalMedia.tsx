"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { Movie } from "@/types/tmdb";

const VideoPlayer = dynamic(
  () => import("./VideoPlayer").then((m) => m.VideoPlayer),
  { ssr: false }
);

interface ModalMediaProps {
  movie: Movie;
  title: string;
  localTrailer: string | null;
  backdrop: string | null;
}

// Renders the modal's media area and owns the YouTube-key lookup. It is mounted
// only when the modal is open (MovieModal returns null otherwise), so the fetch
// effect runs exactly once per opened movie — no conditional/synchronous
// setState in a parent effect (react-hooks/set-state-in-effect).
export function ModalMedia({
  movie,
  title,
  localTrailer,
  backdrop,
}: ModalMediaProps) {
  const [ytKey, setYtKey] = useState<string | null>(null);
  // Start "loading" when a YouTube lookup will run (no local trailer), so the
  // flag never needs a synchronous setState in the effect — only the async
  // `.finally` flips it off (react-hooks/set-state-in-effect).
  const [loadingTrailer, setLoadingTrailer] = useState(!localTrailer);

  useEffect(() => {
    if (localTrailer) return;
    const type =
      movie.media_type === "tv" || (!movie.media_type && movie.first_air_date)
        ? "tv"
        : "movie";
    let active = true;
    fetch(`/api/trailer/${movie.id}?type=${type}`)
      .then((r) => r.json())
      .then((d) => active && setYtKey(d.key ?? null))
      .catch(() => active && setYtKey(null))
      .finally(() => active && setLoadingTrailer(false));
    return () => {
      active = false;
    };
  }, [movie, localTrailer]);

  return (
    <div className="relative aspect-video w-full bg-black">
      {localTrailer ? (
        <VideoPlayer src={localTrailer} poster={backdrop ?? undefined} />
      ) : ytKey ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${ytKey}?autoplay=1&mute=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : backdrop ? (
        <Image
          src={backdrop}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      ) : (
        <div className="h-full w-full bg-surface-overlay" />
      )}
      {loadingTrailer && !ytKey && (
        <div className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-1 text-xs text-white/70">
          Loading trailer…
        </div>
      )}
    </div>
  );
}
