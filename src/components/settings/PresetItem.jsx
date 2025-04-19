import styles from "./WorkHourPresets.module.css";
import CheckIcon from "../icons/CheckIcon";

export default function PresetItem({
  preset,
  deletePreset,
  handleChangePreset,
}) {
  const { selected, enabled } = preset;

  return (
    <div
      key={preset.id}
      className={`${styles.preset_item} ${selected && styles.selected} `}
      onClick={() => handleChangePreset(preset.id)}
    >
      <div className={styles.title_container}>
        <div
          className={`${styles.preset_checkbox} ${enabled && styles.enabled}`}
        >
          {enabled && <CheckIcon color="white" width="16" height="16" />}
        </div>
        {preset.name}
      </div>
      <div className={styles.preset_buttons}>
        <button className={styles.preset_button}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20.1L20 10.1V8L14 2H6M13 3.5L18.5 9H13V3.5M20.1 13C20 13 19.8 13.1 19.7 13.2L18.7 14.2L20.8 16.3L21.8 15.3C22 15.1 22 14.7 21.8 14.5L20.5 13.2C20.4 13.1 20.3 13 20.1 13M18.1 14.8L12 20.9V23H14.1L20.2 16.9L18.1 14.8Z" />
          </svg>
        </button>
        <button
          className={styles.preset_button}
          onClick={() => deletePreset(preset.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
