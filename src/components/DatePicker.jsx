import styles from "./DatePicker.module.css";
import { useState } from "react";

export default function DatePicker({ changeDay, selectedDate }) {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const changeMonth = (key) => {
    switch (key) {
      case "prevMonth":
        setCurrentMonth((prevMonth) => {
          if (prevMonth === 0) {
            setCurrentYear((prevYear) => prevYear - 1);
            return 11;
          }
          return prevMonth - 1;
        });
        break;

      case "nextMonth":
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

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const renderCalendar = (month, year) => {
    const date = new Date(year, month, 1);
    const firstDay = (date.getDay() + 6) % 7;
    const totalDays = daysInMonth(month, year);
    const calendarDays = [];

    const daysOfWeek = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

    for (let day of daysOfWeek) {
      calendarDays.push(
        <div key={day} className={styles.day_header}>
          {day}
        </div>
      );
    }

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(
        <div key={`empty_${i}`} className="calendar-day empty"></div>
      );
    }

    for (let day = 1; day <= totalDays; day++) {
      const currentDate = new Date(Date.UTC(year, month, day));
      const isMonday = currentDate.getDay() === 1;
      let isSelected;
      if (!isMonday) {
        isSelected =
          selectedDate &&
          selectedDate.toDateString() === currentDate.toDateString();
      }

      calendarDays.push(
        <div
          key={day}
          className={`${styles.date_day} ${isSelected ? styles.selected : ""} ${isMonday ? styles.inactive : ""}`}
          onClick={() => !isMonday && changeDay(currentDate)}
        >
          {day}
        </div>
      );
    }
    return calendarDays;
  };

  return (
    <div className={styles.date_container}>
      <div className={styles.date_wrapper}>
        <div className={styles.date_header}>
          <button onClick={() => changeMonth("prevMonth")}>left</button>
          <div>{`${new Date(currentYear, currentMonth).toLocaleString("de-DE", { month: "long", year: "numeric" })}`}</div>
          <button onClick={() => changeMonth("nextMonth")}>right</button>
        </div>
        <div className={styles.date_grid}>
          {renderCalendar(currentMonth, currentYear)}
        </div>
      </div>
    </div>
  );
}
