import styles from './DatePicker.module.css';

export default function DayHeaders() {
  return ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
    <div key={day} className={styles.day_header}>
      {day}
    </div>
  ));
}
