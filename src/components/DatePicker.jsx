import styles from "./DatePicker.module.css";
import { useState } from "react";
import ArrowDatePicker from "../components/icons/ArrowDatePicker";

const timeSlots = [
  {
    id: 1,
    cap: 10,
    maxCap: 12,
    start: "2024-07-05T09:00:00",
    end: "2024-07-05T10:00:00",
  },
  {
    id: 2,
    cap: 10,
    maxCap: 12,
    start: "2024-07-05T10:00:00",
    end: "2024-07-05T11:00:00",
  },
  {
    id: 3,
    cap: 10,
    maxCap: 12,
    start: "2024-07-05T11:00:00",
    end: "2024-07-05T12:00:00",
  },
  {
    id: 4,
    cap: 10,
    maxCap: 12,
    start: "2024-07-05T12:00:00",
    end: "2024-07-05T13:00:00",
  },
  {
    id: 5,
    cap: 10,
    maxCap: 12,
    start: "2024-07-06T10:00:00",
    end: "2024-07-06T10:45:00",
  },
  {
    id: 6,
    cap: 10,
    maxCap: 12,
    start: "2024-07-06T11:00:00",
    end: "2024-07-06T11:45:00",
  },
  {
    id: 7,
    cap: 10,
    maxCap: 12,
    start: "2024-07-07T11:00:00",
    end: "2024-07-07T11:45:00",
  },
  {
    id: 8,
    cap: 10,
    maxCap: 12,
    start: "2024-09-18T11:00:00",
    end: "2024-09-18T11:45:00",
  },
  {
    id: 9,
    cap: 10,
    maxCap: 12,
    start: "2024-09-19T11:00:00",
    end: "2024-09-19T11:45:00",
  },
  {
    id: 10,
    cap: 10,
    maxCap: 12,
    start: "2024-09-07T11:00:00",
    end: "2024-09-07T11:45:00",
  },
  {
    id: 11,
    cap: 10,
    maxCap: 12,
    start: "2024-09-14T11:00:00",
    end: "2024-09-14T11:45:00",
  },
  {
    id: 12,
    cap: 10,
    maxCap: 12,
    start: "2024-09-21T11:00:00",
    end: "2024-09-21T11:45:00",
  },
  {
    id: 13,
    cap: 10,
    maxCap: 12,
    start: "2024-09-28T11:00:00",
    end: "2024-09-28T11:45:00",
  },
];

export default function DatePicker({
  changeDay,
  selectedDate,
  isPastDisabled = false,
  checkAvailability = false,
}) {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const findAvailableDay = (currentDate, availableDays) => {
    const currentDay = new Date(currentDate).toDateString();

    return availableDays.some((day) => {
      const availableDay = new Date(day.start).toDateString();

      return currentDay === availableDay;
    });
  };

  const changeMonth = (key) => {
    switch (key) {
      case "prevMonth":
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
      const isAvaliable = checkAvailability
        ? findAvailableDay(currentDate, timeSlots)
        : true;
      let isSelected;
      if (isAvaliable) {
        isSelected =
          selectedDate &&
          selectedDate.toDateString() === currentDate.toDateString();
      }

      calendarDays.push(
        <div
          key={day}
          className={`${styles.date_day} ${isSelected ? styles.selected : ""} ${!isAvaliable ? styles.inactive : ""}`}
          onClick={() => isAvaliable && changeDay(currentDate)}
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
          <button
            className={styles.left_arrow}
            onClick={() => changeMonth("prevMonth")}
          >
            <ArrowDatePicker />
          </button>
          <div>{`${new Date(currentYear, currentMonth).toLocaleString("de-DE", { month: "long", year: "numeric" })}`}</div>
          <button
            className={styles.right_arrow}
            onClick={() => changeMonth("nextMonth")}
          >
            <ArrowDatePicker />
          </button>
        </div>
        <div className={styles.date_grid}>
          {renderCalendar(currentMonth, currentYear)}
        </div>
      </div>
    </div>
  );
}
