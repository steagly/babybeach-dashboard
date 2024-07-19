import { useEffect, useState } from "react";
import DatePicker from "../DatePicker";
import Header from "./BookingHeader";
import TimeSlots from "./BookingSlots";
import getTimeSlots from "../../api/booking";
import useBookingStore from "../../store/bookingStore";
import PersonCard from "./PersonCard";

import babyIcon from "../../assets/baby.svg";

import styles from "./Main.module.css";

export default function Appointment() {
  const {
    selectedDate,
    timeSlots,
    setTimeSlots,
    changeDate,
    setSelectedTimeSlot,
    changePersonCount,
    bookingInfo,
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
          <div className={styles.booking_summary}>
            <h3>Booking info</h3>
          </div>
        </div>
        <h3>Anzahl der personen</h3>
        <div className={styles.person_cards}>
          <PersonCard
            icon={babyIcon}
            changePersonCount={changePersonCount}
            type="unknown"
            bookingInfo={bookingInfo}
          >
            Kleinkind unter 3 Jahren
          </PersonCard>
          <PersonCard
            icon={babyIcon}
            changePersonCount={changePersonCount}
            type="adult"
            bookingInfo={bookingInfo}
          >
            Kind 3-13 Jahren
          </PersonCard>
          <PersonCard
            icon={babyIcon}
            changePersonCount={changePersonCount}
            type="baby"
            bookingInfo={bookingInfo}
          >
            Jugendliche 14-17 Jahren
          </PersonCard>
          <PersonCard
            icon={babyIcon}
            changePersonCount={changePersonCount}
            type="kid"
            bookingInfo={bookingInfo}
          >
            Erwachsene über 18 Jahren
          </PersonCard>
        </div>
        <div>booking info</div>
      </div>
    </>
  );
}
