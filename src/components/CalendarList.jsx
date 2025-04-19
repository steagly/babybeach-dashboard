import useCalendarStore from "../store/calendarStore";

import styles from "./CalendarList.module.css";

export default function CalendarList() {
  const events = useCalendarStore((state) => state.events);

  return (
    <div>
      {events &&
        events.map((event) => {
          const {
            id,
            lastName,
            firstName,
            date,
            email,
            phone,
            card,
            participants,
          } = event;

          return (
            <div>
              <p>date: {date}</p>
              <p>name: {lastName} </p>
              <p>name: {firstName} </p>
            </div>
          );
        })}
    </div>
  );
}
