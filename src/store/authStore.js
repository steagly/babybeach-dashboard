import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      login: (token) => set({ isAuthenticated: true, accessToken: token }),
      logout: () => set({ isAuthenticated: false, accessToken: null }),
    }),
    {
      name: "auth",
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
