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

  deleteEvent: (eventId) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== eventId),
    })),

  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events
        .filter((event) => event.id !== updatedEvent.id)
        .concat(updatedEvent),
    })),
}));

export default useCalendarStore;
