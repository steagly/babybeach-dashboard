import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  mode: "edit",
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setMode: (mode) => set(() => ({ mode: mode })),
}));

export default useModalStore;
