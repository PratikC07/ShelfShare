import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type User } from "@/features/auth/types";

interface AuthState {
  token: string | null;
  user: User | null;
  isHydrated: boolean; // <-- ADD THIS
  login: (data: { token: string; user: User }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isHydrated: false, // <-- SET INITIAL STATE
      login: (data) => set({ token: data.token, user: data.user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // This function runs once persistence is complete
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    }
  )
);
