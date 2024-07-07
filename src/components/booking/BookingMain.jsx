import DatePicker from "../DatePicker";
import Header from "./BookingHeader";
import TimeSlots from "./BookingSlots";

import styles from "./Main.module.css";

export default function Appointment() {
  return (
    <>
      <Header />
      <div className={styles.body_wrapper}>
        <h1>Termin und Uhrzeit wählen</h1>
        <div className={styles.booking_main}>
          <DatePicker />
          <TimeSlots />
        </div>
      </div>
    </>
  );
}
