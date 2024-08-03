import { useEffect } from "react";
import { bookingServices } from "../../configs/booking/booking";
import DatePicker from "../DatePicker";
import Header from "./BookingHeader";
import TimeSlots from "./BookingSlots";
import getTimeSlots from "../../api/booking";
import useBookingStore from "../../store/bookingStore";
import PersonCard from "./PersonCard";
import BookingSummary from "./BookingSummary";

import styles from "./Main.module.css";

export default function Appointment() {
  const {
    selectedDate,
    timeSlots,
    setTimeSlots,
    services,
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
      <div className={styles.main_content}>
        <div className={styles.body_wrapper}>
          <div className={styles.booking_date}>
            <DatePicker
              changeDay={handleDayButton}
              selectedDate={selectedDate}
            />
            <TimeSlots timeSlots={timeSlots} />
          </div>
          <h3>Anzahl der personen</h3>
          <div className={styles.person_cards}>
            {services.map((service) => (
              <PersonCard
                icon={service.icon}
                changePersonCount={changePersonCount}
                type={service.type}
                bookingInfo={bookingInfo}
                price={service.price}
              >
                {service.title}
              </PersonCard>
            ))}
          </div>
        </div>
        <BookingSummary bookingInfo={bookingInfo} />
      </div>
    </>
  );
}
