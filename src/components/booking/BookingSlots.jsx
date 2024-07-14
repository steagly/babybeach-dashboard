import useBookingStore from "../../store/bookingStore";
import styles from "../booking/BookingSlots.module.css";
import TimeSlot from "./TimeSlot";
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

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  return (
    <motion.div
      key={selectedDate}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={styles.timeslots_container}
    >
      <p className={styles.selected_date}>
        {selectedDate.toLocaleString("de-DE", {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })}
      </p>
      <div className={styles.timeslots}>
        {timeSlots && timeSlots.length > 0 ? (
          timeSlots.map((timeSlot) => {
            const formatedStartTime = formatTime(timeSlot.start);
            const formatedEndTime = formatTime(timeSlot.end);
            return (
              <TimeSlot
                key={timeSlot.id}
                startTime={formatedStartTime}
                endTime={formatedEndTime}
                selectedTimeSlot={selectedTimeSlot}
                timeSlotChange={handleTimeSlotChange}
              />
            );
          })
        ) : (
          <p>timeslots not found</p>
        )}
      </div>
    </motion.div>
  );
}
