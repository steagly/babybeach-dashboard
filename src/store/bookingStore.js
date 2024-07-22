import { create } from "zustand";

const useBookingStore = create((set) => ({
  selectedDate: new Date(),
  selectedTimeSlot: {},
  timeSlots: [],
  bookingInfo: {
    date: "",
    hour: 13,
    lastName: "",
    firstName: "",
    adult: 0,
    baby: 0,
    kid: 0,
    phone: "",
    email: "",
    card: 12,
  },

  changeDate: (date) => set({ selectedDate: date }),

  setTimeSlots: (timeSlots) => set({ timeSlots: timeSlots }),

  setSelectedTimeSlot: (timeSlot) => set({ selectedTimeSlot: timeSlot }),

  changePersonCount: (name, action) =>
    set((state) => ({
      bookingInfo: {
        ...state.bookingInfo,
        [name]: Math.max(
          0,
          Math.min(
            9,
            action === "increase"
              ? state.bookingInfo[name] + 1
              : state.bookingInfo[name] - 1
          )
        ),
      },
    })),
}));

export default useBookingStore;
