"use client";

import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useListStore } from "@/store/useListStore";
import type { Movie } from "@/types/tmdb";

export function useMyList() {
  const user = useAuthStore((s) => s.user);
  const items = useListStore((s) => s.items);
  const addOptimistic = useListStore((s) => s.addOptimistic);
  const removeOptimistic = useListStore((s) => s.removeOptimistic);

  const inList = (id: number) => items.some((m) => m.id === id);

  const toggle = async (movie: Movie) => {
    if (!user || !db) {
      toast.error("Sign in to use My List");
      return;
    }
    const ref = doc(db, "users", user.uid, "myList", String(movie.id));
    const already = inList(movie.id);
    try {
      if (already) {
        removeOptimistic(movie.id);
        await deleteDoc(ref);
      } else {
        addOptimistic(movie);
        await setDoc(ref, { movie, addedAt: serverTimestamp() });
      }
    } catch (err) {
      if (already) addOptimistic(movie);
      else removeOptimistic(movie.id);
      toast.error(err instanceof Error ? err.message : "My List update failed");
    }
  };

  return { items, inList, toggle };
}
