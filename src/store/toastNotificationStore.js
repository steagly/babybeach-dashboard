import { create } from "zustand";

const useToastNotificationStore = create((set, get) => ({
  notifications: [],
  autoRemoveEnabled: true,
  setNotification: ({ message, type, duration = 10000 }) => {
    const id = Date.now();

    set((state) => ({
      notifications: [{ id, message, type }, ...state.notifications],
    }));

    if (get().autoRemoveEnabled) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, duration);
    }
  },

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    })),
}));

export default useToastNotificationStore;
