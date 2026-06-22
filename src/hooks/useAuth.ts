"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import type { Auth } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

export function useAuth() {
  const router = useRouter();
  const { user, loading, setLoading } = useAuthStore();

  // Returns the Auth instance, or null (with a toast) when Firebase is
  // unconfigured. Narrows `auth` from `Auth | undefined` for the call sites.
  const requireAuth = (): Auth | null => {
    if (!auth) {
      toast.error("Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* keys.");
      return null;
    }
    return auth;
  };

  const signUp = async (email: string, password: string) => {
    const a = requireAuth();
    if (!a) return;
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(a, email, password);
      router.push("/");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const a = requireAuth();
    if (!a) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(a, email, password);
      router.push("/");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const a = requireAuth();
    if (!a) return;
    setLoading(true);
    try {
      await signOut(a);
      router.push("/login");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, signUp, signIn, logout };
}
