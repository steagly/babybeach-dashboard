import { create } from "zustand";

const useCalendarStore = create((set) => ({
  selectedDate: new Date(),
  calendarFormat: "day",
  events: [],
  selectedEvent: {},

  setSelectedDate: (date) => set({ selectedDate: date }),
  setCalendarFormat: (format) => set({ calendarFormat: format }),
  setEvents: (events) => set({ events: events }),
  setSelectedEvent: (event) => set({ selectedEvent: event }),
}));

export default useCalendarStore;
