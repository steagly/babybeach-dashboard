import useBookingStore from "../../store/bookingStore";
import styles from "../booking/BookingSlots.module.css";
import TimeSlot from "./TimeSlot";
import TimeSlotsNotFound from "./TimeSlotsNotFound";
import { motion } from "framer-motion";

const formatTime = (date) => {
  return new Date(date).toLocaleString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default function TimeSlots({ timeSlots }) {
  const { bookingInfo, selectedDate, selectedTimeSlot, setSelectedTimeSlot } =
    useBookingStore();
  const { baby, adult, kid, teenager } = bookingInfo;

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={timeSlots && timeSlots.length > 0 ? styles.timeslots : ""}
      >
        {timeSlots && timeSlots.length > 0 ? (
          timeSlots.map((timeSlot) => {
            const formatedStartTime = formatTime(timeSlot.start);
            const formatedEndTime = formatTime(timeSlot.end);

            if (
              baby.count + adult.count + kid.count + teenager.count >
              timeSlot.maxCap - timeSlot.cap
            ) {
              selectedTimeSlot &&
              baby.count + adult.count + kid.count + teenager.count >
                selectedTimeSlot.maxCap - selectedTimeSlot.cap
                ? setSelectedTimeSlot(null)
                : "";
              return "";
            }
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
