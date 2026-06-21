"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, initializing } = useAuthStore();

  useEffect(() => {
    if (!initializing && !user) router.replace("/login");
  }, [user, initializing, router]);

  if (!user) return null;
  return <>{children}</>;
}
