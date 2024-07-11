import styles from "./TimeSlot.module.css";
import radioIcon from "../../assets/landing/radio_icon.svg";

export default function TimeSlot({
  startTime,
  endTime,
  selectedTimeSlot,
  timeSlotChange,
}) {
  const timeSlotHours = `${startTime} - ${endTime}`;
  const checked = selectedTimeSlot === timeSlotHours;

  return (
    <label
      htmlFor={timeSlotHours}
      className={`${styles.timeslot} ${timeSlotHours === selectedTimeSlot ? styles.active : ""}`}
    >
      <input
        id={timeSlotHours}
        type="radio"
        name="timeSlot"
        value={timeSlotHours}
        checked={checked}
        onChange={timeSlotChange}
      />
      <span className={styles.radio_icon}>
        {checked && <img src={radioIcon} alt="" />}
      </span>
      {timeSlotHours}
    </label>
  );
}
