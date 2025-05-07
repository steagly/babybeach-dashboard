import styles from './DatePicker.module.css';

import ArrowDatePicker from '../../../components/icons/ArrowDatePicker';

export default function DatePickerHeader({ children, changeMonth }) {
  return (
    <div className={styles.date_header}>
      <button
        className={styles.left_arrow}
        onClick={() => changeMonth('prevMonth')}
      >
        <ArrowDatePicker direction="left" />
      </button>
      <div>{children}</div>
      <button
        className={styles.right_arrow}
        onClick={() => changeMonth('nextMonth')}
      >
        <ArrowDatePicker direction="right" />
      </button>
    </div>
  );
}
