import { create } from "zustand";
import type { Movie } from "@/types/tmdb";

interface ModalState {
  isOpen: boolean;
  movie: Movie | null;
  openModal: (movie: Movie) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  movie: null,
  openModal: (movie) => set({ isOpen: true, movie }),
  closeModal: () => set({ isOpen: false }),
}));
