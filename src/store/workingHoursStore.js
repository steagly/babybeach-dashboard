import { create } from "zustand";

const useWorkingHoursStore = create((set) => ({
  workingHours: [],
  presets: [],
  setFetchedPresets: (presets) =>
    set(() => {
      const selectedPresetIndex = presets.findIndex(
        (preset) => preset.selected
      );

      if (selectedPresetIndex === -1) {
        const updatedPresets = presets.map((preset, index) =>
          index === 0 ? { ...preset, selected: true } : preset
        );
        return { presets: updatedPresets };
      }

      return { presets };
    }),
  changePreset: (id) =>
    set((state) => ({
      presets: state.presets.map((preset) => ({
        ...preset,
        selected: preset.id === id,
      })),
    })),
  setWorkingHours: (workingHours) => set({ workingHours: workingHours }),
  setStatus: (id) =>
    set((state) => ({
      workingHours: state.workingHours.map((workingHour) =>
        workingHour.id === id
          ? { ...workingHour, enabled: !workingHour.enabled }
          : workingHour
      ),
    })),
  setHoursTime: (id, value, type) =>
    set((state) => ({
      workingHours: state.workingHours.map((workingHour) => {
        if (workingHour.id === id) {
          if (type === "start") {
            return { ...workingHour, start: value };
          } else if (type === "end") {
            return { ...workingHour, end: value };
          }
        }
        return workingHour;
      }),
    })),
}));

export default useWorkingHoursStore;
