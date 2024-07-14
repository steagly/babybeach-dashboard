import { create } from "zustand";

const useBookingStore = create((set) => ({
  selectedDate: new Date(),
  selectedTimeSlot: "",
  timeSlots: [],

  changeDate: (date) => set({ selectedDate: date }),
  setTimeSlots: (timeSlots) => set({ timeSlots: timeSlots }),
  setSelectedTimeSlot: (timeSlot) => set({ selectedTimeSlot: timeSlot }),
}));

export default useBookingStore;
