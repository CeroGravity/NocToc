"use client";

import Image from "next/image";
import { tmdbImage } from "@/lib/images";
import { useModalStore } from "@/store/useModalStore";
import type { Movie } from "@/types/tmdb";

export function Thumbnail({ movie }: { movie: Movie }) {
  const openModal = useModalStore((s) => s.openModal);
  const src = tmdbImage(movie.backdrop_path ?? movie.poster_path, "w500");

  if (!src) return null;

  return (
    <button
      onClick={() => openModal(movie)}
      className="relative h-28 min-w-[200px] shrink-0 overflow-hidden rounded-md outline-none ring-brand transition-transform duration-200 hover:z-10 hover:scale-105 focus-visible:ring-2 md:h-36 md:min-w-[260px]"
    >
      <Image
        src={src}
        alt={movie.title ?? movie.name ?? "Thumbnail"}
        fill
        sizes="(max-width: 768px) 200px, 260px"
        className="object-cover"
      />
    </button>
  );
}
