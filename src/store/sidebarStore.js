import { create } from "zustand";

const useSideBarStore = create((set) => ({
  sidebarIsOpen: true,
  toggleSidebar: () =>
    set((state) => ({ sidebarIsOpen: !state.sidebarIsOpen })),
}));

export default useSideBarStore;
