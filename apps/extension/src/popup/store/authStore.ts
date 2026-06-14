import { create } from "zustand";

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;

  login: (token: string) => void;

  logout: () => void;

  restore: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,

  isLoggedIn: false,

  login: (token) =>
    set({
      token,
      isLoggedIn: true,
    }),

  logout: () =>
    set({
      token: null,
      isLoggedIn: false,
    }),

  restore: (token) =>
    set({
      token,
      isLoggedIn: !!token,
    }),
}));
