"use client";

import { Thumbnail } from "@/components/row/Thumbnail";
import { useListStore } from "@/store/useListStore";

export default function MyListPage() {
  const items = useListStore((s) => s.items);

  return (
    <main className="min-h-screen bg-surface-base px-4 pb-24 pt-24 md:px-10">
      <h1 className="font-display text-3xl font-bold text-white">My List</h1>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-white/50">
          Your list is empty. Add titles with the + button on any card or in the details view.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} variant="grid" />
          ))}
        </div>
      )}
    </main>
  );
}
