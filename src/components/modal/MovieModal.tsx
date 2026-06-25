"use client";

import { Check, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useModalStore } from "@/store/useModalStore";
import { useMyList } from "@/hooks/useMyList";
import { resolveTrailer } from "@/lib/trailers";
import { tmdbImage } from "@/lib/images";
import { genreNames } from "@/lib/genres";
import { ModalMedia } from "./ModalMedia";

export function MovieModal() {
  const { isOpen, movie, closeModal } = useModalStore();
  const { inList, toggle } = useMyList();

  if (!movie) return null;

  const title = movie.title ?? movie.name ?? "Untitled";
  const localTrailer = resolveTrailer(movie.id);
  const backdrop = tmdbImage(movie.backdrop_path ?? movie.poster_path, "w1280");
  const year = (movie.release_date ?? movie.first_air_date ?? "").slice(0, 4);
  const genres = genreNames(movie.genre_ids ?? []);
  const added = inList(movie.id);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="w-[92vw] max-w-[1100px] max-h-[90vh] overflow-y-auto overflow-x-hidden border-white/10 bg-surface-raised p-0 text-white">
        <DialogTitle className="sr-only">{title}</DialogTitle>

        {/* Keyed on movie.id so the media area (and its trailer lookup) remounts
            cleanly for each opened title. */}
        {isOpen && (
          <ModalMedia
            key={movie.id}
            movie={movie}
            title={title}
            localTrailer={localTrailer}
            backdrop={backdrop}
          />
        )}

        <div className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-display text-2xl font-bold">{title}</h2>
            <button
              onClick={() => toggle(movie)}
              aria-label={added ? "Remove from My List" : "Add to My List"}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10"
            >
              {added ? <Check className="h-5 w-5 text-brand" /> : <Plus className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="font-semibold text-brand">{movie.vote_average.toFixed(1)} ★</span>
            {year && <span className="text-white/60">{year}</span>}
            {!!genres.length && <span className="text-white/60">{genres.join(" · ")}</span>}
          </div>

          <p className="text-sm leading-relaxed text-white/80">
            {movie.overview || "No description available."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
