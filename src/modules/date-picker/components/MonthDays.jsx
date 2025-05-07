import styles from './DatePicker.module.css';

export default function MonthDays({ days, changeDay }) {
  return days.map(({ day, date, isAvailable, isSelected }) => (
    <div
      key={day}
      className={`${styles.date_day} ${isSelected ? styles.selected : ''} ${!isAvailable ? styles.inactive : ''}`}
      onClick={() => isAvailable && changeDay(date)}
    >
      {day}
    </div>
  ));
}
