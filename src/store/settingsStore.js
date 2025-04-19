import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSettingsStore = create(
  persist(
    (set) => ({
      displayFormat: "calendar",
      freeMovement: false,
      stepInterval: 10,
      setDisplayFormat: (format) =>
        set(() => ({
          displayFormat: format,
        })),
      setMovement: () =>
        set((state) => ({
          freeMovement: !state.freeMovement,
        })),
      setStepInterval: (interval) =>
        set(() => ({
          stepInterval: interval,
        })),
    }),
    { name: "calendar-settings" }
  )
);

export default useSettingsStore;
