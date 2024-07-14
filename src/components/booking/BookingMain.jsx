import { useEffect, useState } from "react";
import DatePicker from "../DatePicker";
import Header from "./BookingHeader";
import TimeSlots from "./BookingSlots";
import getTimeSlots from "../../api/booking";
import useBookingStore from "../../store/bookingStore";
import PersonCard from "./PersonCard";

import kidIcon from "../../assets/kid.svg";
import babyIcon from "../../assets/baby.svg";

import styles from "./Main.module.css";

export default function Appointment() {
  const {
    selectedDate,
    timeSlots,
    setTimeSlots,
    changeDate,
    setSelectedTimeSlot,
  } = useBookingStore();

  const handleDayButton = (currentDate) => {
    changeDate(currentDate);
    console.log(selectedDate);
  };

  useEffect(() => {
    if (selectedDate) {
      getTimeSlots(selectedDate, setTimeSlots);
      setSelectedTimeSlot();
    }
  }, [selectedDate]);

  return (
    <>
      <Header />
      <div className={styles.body_wrapper}>
        <h1>Termin und Uhrzeit wählen</h1>
        <div className={styles.booking_main}>
          <DatePicker changeDay={handleDayButton} selectedDate={selectedDate} />
          <TimeSlots timeSlots={timeSlots} />
        </div>
        <h3>Anzahl der personen</h3>
        <div className={styles.person_cards}>
          <PersonCard icon={babyIcon} />
          <PersonCard icon={kidIcon} />
          <PersonCard icon={babyIcon} />
          <PersonCard icon={kidIcon} />
        </div>
        <div>booking info</div>
      </div>
    </>
  );
}
