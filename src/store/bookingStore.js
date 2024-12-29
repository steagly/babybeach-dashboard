import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { bookingServices } from "../configs/booking/booking";

const useBookingStore = create(
  devtools((set) => ({
    step: 0,
    selectedDate: new Date(),
    selectedTimeSlot: {},
    timeSlots: [],
    services: bookingServices,
    bookingInfo: {
      date: "",
      lastName: "",
      firstName: "",
      phone: "",
      email: "",
      card: 12,
      adult: {
        count: 0,
        price: 14.5,
      },
      baby: {
        count: 0,
        price: 0,
      },
      kid: {
        count: 0,
        price: 2.5,
      },
      teenager: {
        count: 0,
        price: 7.5,
      },
    },

    changeStep: () =>
      set((state) => ({
        ...state,
        step: state.step === 0 ? 1 : 0,
      })),

    changeDate: (date) => set({ selectedDate: date }),

    setTimeSlots: (timeSlots) => set({ timeSlots: timeSlots }),

    setSelectedTimeSlot: (timeSlot) =>
      set((state) => ({
        selectedTimeSlot: timeSlot,
        bookingInfo: {
          ...state.bookingInfo,
          date: timeSlot?.start,
        },
      })),

    changePersonCount: (name, action) =>
      set((state) => ({
        bookingInfo: {
          ...state.bookingInfo,
          [name]: {
            ...state.bookingInfo[name],
            count: Math.max(
              0,
              Math.min(
                9,
                action === "increase"
                  ? state.bookingInfo[name].count + 1
                  : state.bookingInfo[name].count - 1
              )
            ),
          },
        },
      })),

    setService: (service) => {
      set((state) => {
        return {
          ...state,
          services: state.services.map((currService) =>
            service.id === currService.id
              ? { ...currService, count: currService.count + 1 }
              : currService
          ),
        };
      });
    },
  }))
);

export default useBookingStore;
