"use client";

import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { useListStore } from "@/store/useListStore";
import type { Movie } from "@/types/tmdb";

export function ListProvider({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const setItems = useListStore((s) => s.setItems);

  useEffect(() => {
    if (!user || !db) {
      setItems([]);
      return;
    }
    const q = query(
      collection(db, "users", user.uid, "myList"),
      orderBy("addedAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => d.data().movie as Movie));
    });
    return () => unsub();
  }, [user, setItems]);

  return <>{children}</>;
}
