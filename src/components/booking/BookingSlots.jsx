import useBookingStore from "../../store/bookingStore";
import styles from "../booking/BookingSlots.module.css";
import TimeSlot from "./TimeSlot";
import TimeSlotsNotFound from "./TimeSlotsNotFound";
import { motion, AnimatePresence } from "framer-motion";

const formatTime = (date) => {
  return new Date(date).toLocaleString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default function TimeSlots({ timeSlots }) {
  const { selectedDate, selectedTimeSlot, setSelectedTimeSlot } =
    useBookingStore();

  const handleTimeSlotChange = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  return (
    <div className={styles.timeslots_container}>
      <p className={styles.selected_date}>
        {selectedDate.toLocaleString("de-DE", {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })}
      </p>
      <motion.div
        key={selectedDate}
        initial={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.4 }}
        className={timeSlots && timeSlots.length > 0 ? styles.timeslots : ""}
      >
        {timeSlots && timeSlots.length > 0 ? (
          timeSlots.map((timeSlot) => {
            const formatedStartTime = formatTime(timeSlot.start);
            const formatedEndTime = formatTime(timeSlot.end);
            return (
              <TimeSlot
                key={timeSlot.id}
                timeSlot={timeSlot}
                startTime={formatedStartTime}
                endTime={formatedEndTime}
                selectedTimeSlot={selectedTimeSlot}
                timeSlotChange={handleTimeSlotChange}
              />
            );
          })
        ) : (
          <TimeSlotsNotFound />
        )}
      </motion.div>
    </div>
  );
}
