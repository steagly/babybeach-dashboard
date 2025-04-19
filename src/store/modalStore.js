import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  mode: "edit",
  ModalComponent: null,
  modalProps: {},
  openModal: (ModalComponent, modalProps = {}) =>
    set(() => ({
      ModalComponent: ModalComponent,
      isOpen: true,
      modalProps: modalProps,
    })),
  closeModal: () => set(() => ({ ModalComponent: null, isOpen: false })),
  setMode: (mode) => set(() => ({ mode: mode })),
}));

export default useModalStore;
