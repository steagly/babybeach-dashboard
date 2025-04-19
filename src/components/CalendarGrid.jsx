import styles from "./Calendar.module.css";

import timeIcon from "../assets/calendar_time.svg";

import useCalendarStore from "../store/calendarStore";
import useModalStore from "../store/modalStore";

import HourCell from "../modules/calendar/HourCell";
import DnDWrapper from "./DnDWrapper";
import EditEventModal from "./EventModal";
import Button from "../ui/buttons/Button";

import { useMemo } from "react";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function CalendarGrid() {
  const calendarFormat = useCalendarStore((state) => state.calendarFormat);
  const events = useCalendarStore((state) => state.events);

  const openModal = useModalStore((state) => state.openModal);
  const setMode = useModalStore((state) => state.setMode);

  const generateHours = (timeInterval, startTime, endTime) => {
    const hours = [];
    const date = new Date();

    date.setHours(startTime, 0, 0, 0);

    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    do {
      hours.push(formatter.format(date));
      date.setMinutes(date.getMinutes() + timeInterval);
    } while (
      date.getHours() < endTime ||
      (date.getHours() === endTime && date.getMinutes() === 0)
    );

    return hours;
  };

  const hours = useMemo(() => generateHours(60, 10, 18), [10, 18]);

  const handleCreateEvent = () => {
    setMode("create");
    openModal(EditEventModal);
  };

  return (
    <div className={styles.calendar}>
      {calendarFormat === "week" ? (
        <div className={styles.calendar_header}>
          <div className={styles.time_cell}>
            <img src={timeIcon} alt="time icon" />
          </div>
          {days.map((day, index) => (
            <div key={index} className={styles.day_header}>
              {day}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      <div
        className={`${calendarFormat === "week" ? styles.calendar_body : styles.calendar_body_day}`}
      >
        {hours.map((hour) => (
          <>
            <HourCell hour={hour} />
            {calendarFormat === "week" ? (
              days.map((day, index) => (
                <div key={index} className={styles.calendar_cell}>
                  {hour === 9 && day === "Monday" && <p>Hello</p>}
                </div>
              ))
            ) : (
              <div
                className={`${styles.calendar_cell} ${styles.cell_row}`}
                onDoubleClick={handleCreateEvent}
              >
                <div className={styles.hour_buttons}>
                  <Button iconOnly>!</Button>
                  <Button iconOnly>?</Button>
                  <Button iconOnly>X</Button>
                </div>
              </div>
            )}
          </>
        ))}
        <DnDWrapper events={events} />
      </div>
    </div>
  );
}
