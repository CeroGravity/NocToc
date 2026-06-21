"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, isConfigured } from "@/lib/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

export function useAuth() {
  const router = useRouter();
  const { user, loading, setLoading } = useAuthStore();

  const ensureConfigured = () => {
    if (!isConfigured) {
      toast.error("Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* keys.");
      return false;
    }
    return true;
  };

  const signUp = async (email: string, password: string) => {
    if (!ensureConfigured()) return;
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!ensureConfigured()) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, signUp, signIn, logout };
}
