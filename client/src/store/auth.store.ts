import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// We can define a basic User type here
// We'll expand this later based on our API response
interface User {
  _id: string;
  name: string;
  email: string;
  referralCode: string;
  totalCredits: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (data: { token: string; user: User }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  // 'persist' middleware saves the store to localStorage
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (data) => set({ token: data.token, user: data.user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage", // key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
