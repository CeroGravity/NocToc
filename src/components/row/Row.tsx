"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Thumbnail } from "./Thumbnail";
import type { Movie } from "@/types/tmdb";

export function Row({ title, movies }: { title: string; movies: Movie[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [moved, setMoved] = useState(false);

  if (!movies.length) return null;

  const scroll = (dir: "left" | "right") => {
    setMoved(true);
    const el = rowRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth } = el;
    el.scrollTo({
      left: dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="group/row space-y-1.5">
      <h2 className="px-4 text-sm font-semibold text-white/90 md:px-10 md:text-base">
        {title}
      </h2>
      <div className="relative">
        <button
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          className={`absolute left-0 top-0 z-20 flex h-full w-12 items-center justify-center bg-gradient-to-r from-surface-base/90 to-transparent opacity-0 transition-opacity group-hover/row:opacity-100 ${
            moved ? "" : "hidden"
          }`}
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </button>

        <div
          ref={rowRef}
          className="scrollbar-hide flex gap-2 overflow-x-scroll scroll-smooth px-4 py-2 md:px-10"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <button
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 z-20 flex h-full w-12 items-center justify-center bg-gradient-to-l from-surface-base/90 to-transparent opacity-0 transition-opacity group-hover/row:opacity-100"
        >
          <ChevronRight className="h-8 w-8 text-white" />
        </button>
      </div>
    </div>
  );
}
