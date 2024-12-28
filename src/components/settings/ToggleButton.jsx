import styles from "./SettingsPage.module.css";

export default function ToggleButton({ isAvailable, id, changeAvailability }) {
  return (
    <button
      className={`${styles.toggle} ${isAvailable ? styles.toggled : ""}`}
      onClick={() => changeAvailability(id)}
    >
      <div className={styles.thumb}></div>
    </button>
  );
}
