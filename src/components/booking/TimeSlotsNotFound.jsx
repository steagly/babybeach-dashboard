import boyIcon from "../../assets/landing/boy_ask.svg";
import styles from "./TimeSlotsNotFound.module.css";

export default function TimeSlotsNotFound() {
  return (
    <div className={styles.not_found}>
      <div className={styles.info}>
        <h3>Slots doesn't found</h3>
        <p>
          Sorry, we couldn't find any available slots for the selected date.
          Please choose another date.
        </p>
      </div>
    </div>
  );
}
