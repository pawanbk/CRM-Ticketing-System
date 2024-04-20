import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  isLoggedIn: false,
  user: null,
};

export const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,
      setUser: (userData) => set({ isLoggedIn: true, user: userData }),
      logout: () => set({ ...initialState }),
    }),
    {
      name: "auth-sate",
      getStorage: () => localStorage,
    }
  )
);
