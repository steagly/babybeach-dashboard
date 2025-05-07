export default function DatePickerGrid() {
  return (
    <div className={styles.date_grid}>
      {renderCalendar(currentMonth, currentYear)}
    </div>
  );
}
