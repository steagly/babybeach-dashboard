import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  accessToken: null,
  login: (token) => set({ isAuthenticated: true, accessToken: token }),
  logout: () => set({ isAuthenticated: false, accessToken: null }),
}));

export default useAuthStore;
