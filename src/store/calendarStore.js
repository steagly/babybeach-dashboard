import { create } from "zustand";

const useCalendarStore = create((set, get) => ({
  selectedDate: new Date(),
  calendarFormat: "day",
  events: [],
  selectedEvent: {},
  dayParticipants: {},

  setSelectedDate: (date) => set({ selectedDate: date }),
  setCalendarFormat: (format) => set({ calendarFormat: format }),
  setEvents: (events) => {
    set({ events: events });

    get().countParticipants();
  },
  setSelectedEvent: (event) => set({ selectedEvent: event }),

  updateEventTime: (eventId, newTime) => {
    set((state) => ({
      events: state.events.map((event) => {
        if (event.id === eventId) {
          const newDate = new Date(event.date);

          const hours = newTime.split(":")[0];
          const minutes = newTime.split(":")[1];

          newDate.setHours(hours);
          newDate.setMinutes(minutes);

          const updatedEvent = { ...event, date: newDate.toISOString() };
          return updatedEvent;
        }

        return event;
      }),
    }));

    console.log(get().events);
  },

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

  createEvent: (event) =>
    set((state) => ({
      events: { ...state.events, event },
    })),

  countParticipants: () => {
    const { events, selectedDate } = get();

    console.log("rerenders");

    set(() => ({
      dayParticipants: events.reduce((acc, event) => {
        const { participants, date } = event;
        const eventDate = new Date(date);
        const roundedHour = Math.floor(
          eventDate.getHours() + eventDate.getMinutes() / 60
        );

        const isDateEqual =
          eventDate.toISOString().split("T")[0] ===
          selectedDate.toISOString().split("T")[0];

        if (!acc.participantsByDay) {
          acc.participantsByDay = { adult: 0, baby: 0, kid: 0, teenager: 0 };
        }

        if (!acc.participantsByHours) {
          acc.participantsByHours = {};
        }

        if (isDateEqual) {
          for (const [key, value] of Object.entries(participants)) {
            acc.participantsByDay[key] =
              (acc.participantsByDay[key] ?? 0) + value;
          }
        }

        if (isDateEqual) {
          if (!acc.participantsByHours[roundedHour]) {
            acc.participantsByHours[roundedHour] = 0;
          }
          acc.participantsByHours[roundedHour] += Object.values(
            participants
          ).reduce((sum, value) => sum + value, 0);
        }

        if (!acc.date && isDateEqual) {
          acc.date = selectedDate.toISOString();
        }

        return acc;
      }, {}),
    }));
  },
}));

export default useCalendarStore;
