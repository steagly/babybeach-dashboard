import styles from "./RadioButton.module.css";
import CheckIcon from "../../components/icons/CheckIcon";

export default function RadioButton({ value, selected, text, onChange, name }) {
  const isChecked = value === selected;

  return (
    <div>
      <input
        className={styles.custom_radio}
        type="radio"
        id={value}
        name={name}
        onChange={() => onChange(value)}
        checked={isChecked}
        value={value}
      />
      <label
        htmlFor={value}
        className={`${styles.radio_wrapper} ${isChecked ? styles.selected : ""}`}
      >
        <span
          className={`${styles.circle} ${isChecked ? styles.circle_selected : ""}`}
        >
          {isChecked && <CheckIcon width="12" height="12" />}
        </span>
        <span>{text}</span>
      </label>
    </div>
  );
}
