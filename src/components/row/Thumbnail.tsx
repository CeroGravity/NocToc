"use client";

import Image from "next/image";
import { Check, Plus } from "lucide-react";
import { tmdbImage } from "@/lib/images";
import { useModalStore } from "@/store/useModalStore";
import { useMyList } from "@/hooks/useMyList";
import type { Movie } from "@/types/tmdb";

export function Thumbnail({
  movie,
  variant = "row",
}: {
  movie: Movie;
  variant?: "row" | "grid";
}) {
  const openModal = useModalStore((s) => s.openModal);
  const { inList, toggle } = useMyList();
  const src = tmdbImage(movie.backdrop_path ?? movie.poster_path, "w500");
  const added = inList(movie.id);

  if (!src) return null;

  const sizeClass =
    variant === "grid"
      ? "relative aspect-video w-full"
      : "relative h-28 min-w-[200px] shrink-0 md:h-36 md:min-w-[260px]";

  return (
    <div className={`group/thumb ${sizeClass}`}>
      <button
        onClick={() => openModal(movie)}
        className="relative block h-full w-full overflow-hidden rounded-md outline-none ring-brand transition-transform duration-200 hover:scale-105 focus-visible:ring-2"
      >
        <Image
          src={src}
          alt={movie.title ?? movie.name ?? "Thumbnail"}
          fill
          sizes="(max-width: 768px) 200px, 260px"
          className="object-cover"
        />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggle(movie);
        }}
        aria-label={added ? "Remove from My List" : "Add to My List"}
        className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white opacity-0 backdrop-blur transition-opacity group-hover/thumb:opacity-100 focus-visible:opacity-100"
      >
        {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </button>
    </div>
  );
}
