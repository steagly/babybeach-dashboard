import styles from "./SettingsPage.module.css";

export default function ToggleButton({
  isAvailable,
  id,
  onChange,
  size = "default",
  disabled = false,
}) {
  const classNames = [
    styles.toggle,
    styles[size],
    isAvailable ? styles.toggled : "",
    disabled ? styles.disabled : "",
  ].join(" ");

  return (
    <button className={classNames} onClick={() => onChange(id)}>
      <div className={styles.thumb}></div>
    </button>
  );
}
