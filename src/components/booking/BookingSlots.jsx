import styles from "../booking/BookingSlots.module.css";
import TimeSlot from "./TimeSlot";
import { useState } from "react";

const timeSlots = [
  {
    id: 10,
    cap: 10,
    maxCap: 12,
    start: "2024-07-05T09:00:00",
    end: "2024-07-05T10:00:00",
  },
  {
    id: 9,
    cap: 10,
    maxCap: 12,
    start: "2024-07-05T10:00:00",
    end: "2024-07-05T11:00:00",
  },
  {
    id: 8,
    cap: 10,
    maxCap: 12,
    start: "2024-07-05T11:00:00",
    end: "2024-07-05T12:00:00",
  },
  {
    id: 7,
    cap: 10,
    maxCap: 12,
    start: "2024-07-05T12:00:00",
    end: "2024-07-05T13:00:00",
  },
];

const formatTime = (date) => {
  return new Date(date).toLocaleString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default function TimeSlots() {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  return (
    <div className={styles.timeslots_container}>
      <div className={styles.timeslots}>
        {timeSlots.map((timeSlot) => {
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
        })}
      </div>
    </div>
  );
}
