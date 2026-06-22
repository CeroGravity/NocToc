import { create } from "zustand";
import type { Movie } from "@/types/tmdb";

interface ListState {
  items: Movie[];
  setItems: (items: Movie[]) => void;
  addOptimistic: (movie: Movie) => void;
  removeOptimistic: (id: number) => void;
}

export const useListStore = create<ListState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  addOptimistic: (movie) =>
    set((s) =>
      s.items.some((m) => m.id === movie.id) ? s : { items: [movie, ...s.items] }
    ),
  removeOptimistic: (id) =>
    set((s) => ({ items: s.items.filter((m) => m.id !== id) })),
}));
