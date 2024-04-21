import { create } from "zustand";
import { persist } from "zustand/middleware";
import { InitialAuthState } from "./shared/interface";

const initialState: InitialAuthState = {
  isLoggedIn: false,
  user: {
    _id:'',
    email:'',
    username:''
  },
};

export const useAuthStore = create (
  persist(
    (set) => ({
      ...initialState,
      setUser: (userData: {}) => set({ isLoggedIn: true, user: userData }),
      logout: () => set({ ...initialState }),
    }),
    {
      name: "auth-sate",
      getStorage: () => localStorage,
    }
  )
);
