import styles from "./BookingSummary.module.css";
import calendarIcon from "../../assets/landing/calendar_gradient.svg";
import timerIcon from "../../assets/landing/timer_gradient.svg";

export default function BookingSummary() {
  return (
    <div className={styles.booking_summary}>
      <div className={styles.empty}>
        <h3>Your Booking</h3>
        <div className={styles.booking_body}>
          <div className={styles.date_container}>
            <div className={styles.booking_date}>
              <img src={calendarIcon} alt="" />
              <div className={styles.date_info}>
                <p className={styles.title}>Time</p>
                <p>09.05 11:00</p>
              </div>
            </div>
            <div className={styles.booking_duration}>
              <img src={timerIcon} alt="" />
              <div className={styles.date_info}>
                <p className={styles.title}>Duration</p>
                <p>45 minutes</p>
              </div>
            </div>
          </div>
          <div className={styles.services}>
            <div className={styles.service_item}>
              <p>sadasda</p>
              <p>2x sadasda</p>
            </div>
            <div className={styles.service_item}>
              <p>asdada</p>
              <p>1x sadasda</p>
            </div>
          </div>
          <p>Summary</p>
        </div>
      </div>
    </div>
  );
}
