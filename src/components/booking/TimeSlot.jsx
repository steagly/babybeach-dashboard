import styles from "./TimeSlot.module.css";
import radioIcon from "../../assets/landing/radio_icon.svg";

export default function TimeSlot({
  timeSlot,
  startTime,
  endTime,
  selectedTimeSlot,
  timeSlotChange,
}) {
  const timeSlotHours = `${startTime} - ${endTime}`;
  const checked = selectedTimeSlot?.id === timeSlot?.id;

  return (
    <label
      htmlFor={timeSlot.id}
      className={`${styles.timeslot} ${timeSlot?.id === selectedTimeSlot?.id ? styles.active : ""}`}
    >
      <input
        id={timeSlot?.id}
        type="radio"
        name="timeSlot"
        value={timeSlotHours}
        checked={checked}
        onChange={() => timeSlotChange(timeSlot)}
      />
      <span className={styles.radio_icon}>
        {checked && <img src={radioIcon} alt="" />}
      </span>
      {timeSlotHours}
    </label>
  );
}
