import { create } from "zustand";

const useCalendarStore = create((set) => ({
  selectedDate: new Date(),
  calendarFormat: "day",

  setSelectedDate: (date) => set({ selectedDate: date }),
  setCalendarFormat: (format) => set({ calendarFormat: format }),
}));

export default useCalendarStore;
