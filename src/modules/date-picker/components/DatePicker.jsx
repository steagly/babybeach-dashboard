import { useState } from 'react';

import { renderMonthDays } from '../utils/renderUtils';

import DatePickerHeader from './DatePickerHeader';
import EmptyDays from './EmptyDays';
import MonthDays from './MonthDays';
import DayHeaders from './DayHeaders';

import styles from './DatePicker.module.css';

export default function DatePicker({
  changeDay,
  selectedDate,
  isPastDisabled = false,
  checkAvailability = false,
}) {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const days = renderMonthDays(currentMonth, currentYear, {
    selectedDate,
    checkAvailability,
  });

  const changeMonth = (key) => {
    switch (key) {
      case 'prevMonth':
        setCurrentMonth((prevMonth) => {
          if (prevMonth === 0) {
            setCurrentYear((prevYear) => prevYear - 1);
            return 11;
          }

          if (
            isPastDisabled &&
            currentYear === today.getFullYear() &&
            prevMonth === today.getMonth()
          ) {
            return prevMonth;
          }

          return prevMonth - 1;
        });
        break;

      case 'nextMonth':
        setCurrentMonth((prevMonth) => {
          if (prevMonth === 11) {
            setCurrentYear((prevYear) => prevYear + 1);
            return 0;
          }
          return prevMonth + 1;
        });
        break;
    }
  };

  const firstDayOfMonth =
    (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;

  return (
    <div className={styles.date_picker}>
      <div className={styles.wrapper}>
        <DatePickerHeader changeMonth={changeMonth}>
          {new Date(currentYear, currentMonth).toLocaleString('de-DE', {
            month: 'long',
            year: 'numeric',
          })}
        </DatePickerHeader>
        <div className={styles.date_grid}>
          <DayHeaders />
          <EmptyDays count={firstDayOfMonth} />
          <MonthDays days={days} changeDay={changeDay} />
        </div>
      </div>
    </div>
  );
}
