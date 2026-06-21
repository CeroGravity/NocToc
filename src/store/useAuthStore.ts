import { create } from "zustand";
import type { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  initializing: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setInitializing: (initializing: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  initializing: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setInitializing: (initializing) => set({ initializing }),
}));
