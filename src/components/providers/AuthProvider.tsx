"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/useAuthStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setInitializing, initializing } = useAuthStore();

  useEffect(() => {
    // Firebase not configured (no env keys yet): stop blocking the app.
    // Guarding on `auth` (not the boolean flag) lets TS narrow it to non-undefined.
    if (!auth) {
      setInitializing(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
    });
    return () => unsubscribe();
  }, [setUser, setInitializing]);

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-base">
        <span className="font-display text-2xl text-brand animate-pulse">NocToc</span>
      </div>
    );
  }

  return <>{children}</>;
}
