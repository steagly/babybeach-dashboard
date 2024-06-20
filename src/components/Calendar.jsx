import React, { useState, useEffect } from "react";
import arrowLeft from "../assets/arrow_left.svg";
import arrowRight from "../assets/arrow_right.svg";
import styles from "./calendar.module.css";
import Header from "./Header";
import Overlay from "./Overlay";
import timeIcon from "../assets/calendar_time.svg";
import eventName from "../assets/event_name.svg";
import adultIcon from "../assets/adult.svg";
import kidIcon from "../assets/kid.svg";
import babyIcon from "../assets/baby.svg";
import teenagerIcon from "../assets/teenager.svg";
import cardsIcon from "../assets/cards_dark.svg";
import DatePicker from "./DatePicker";
import { motion } from "framer-motion";
import axios from "axios";
import useCalendarStore from "../store/calendarStore";
import useModalStore from "../store/modalStore";

export default function Calendar() {
  const setIsOpen = useModalStore((state) => state.setIsOpen);
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);
  const calendarFormat = useCalendarStore((state) => state.calendarFormat);
  const setCalendarFormat = useCalendarStore(
    (state) => state.setCalendarFormat
  );
  const [events, setEvents] = useState();

  const handleDayButton = () => {
    const today = new Date();
    if (!today.getDay === 1) {
      setSelectedDate(today);
    }
    setCalendarFormat("day");
  };

  const handleWeekButton = () => {
    setSelectedDate(null);
    setCalendarFormat("week");
  };

  const changeDay = (dayCount) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + dayCount);
    setSelectedDate(newDate);
  };

  async function getEvents(date) {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/events?date=${date.toISOString()}`
      );
      setEvents(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (selectedDate) {
      getEvents(selectedDate);
    }
  }, [selectedDate]);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  return (
    <>
      <Overlay />
      <Header sectionName={"Calendar"} />
      <motion.div
        className={styles.calendar_container}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <DatePicker />
        <div className={styles.calendar_wrapper}>
          <div className={styles.header}>
            <div className={styles.button_container}>
              <button
                className={`${styles.calendar_button} ${calendarFormat === "day" ? styles.active : ""}`}
                onClick={handleDayButton}
              >
                Day
              </button>
              <button
                className={`${styles.calendar_button} ${calendarFormat === "week" ? styles.active : ""}`}
                onClick={handleWeekButton}
              >
                Week
              </button>
            </div>
            <div className={styles.date_container}>
              <button
                className={styles.date_button}
                onClick={() => changeDay(-1)}
              >
                <img src={arrowLeft} alt="" />
              </button>
              <p>
                {selectedDate &&
                  selectedDate.toLocaleString("de-DE", {
                    month: "2-digit",
                    year: "numeric",
                    day: "2-digit",
                    weekday: "long",
                  })}
              </p>
              <button
                className={styles.date_button}
                onClick={() => changeDay(+1)}
              >
                <img src={arrowRight} alt="" />
              </button>
            </div>
            <button className={styles.refresh_button}>
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5018 4.4979C11.4747 3.47081 10.0651 2.83331 8.49967 2.83331C6.99678 2.83331 5.55544 3.43034 4.49274 4.49304C3.43003 5.55575 2.83301 6.99709 2.83301 8.49998C2.83301 10.0029 3.43003 11.4442 4.49274 12.5069C5.55544 13.5696 6.99678 14.1666 8.49967 14.1666C11.1418 14.1666 13.3447 12.3604 13.9751 9.91665H12.5018C11.9209 11.5671 10.3484 12.75 8.49967 12.75C7.3725 12.75 6.2915 12.3022 5.49447 11.5052C4.69744 10.7082 4.24967 9.62715 4.24967 8.49998C4.24967 7.37281 4.69744 6.29181 5.49447 5.49478C6.2915 4.69775 7.3725 4.24998 8.49967 4.24998C9.67551 4.24998 10.7238 4.73873 11.4888 5.51081L9.20801 7.79165H14.1663V2.83331L12.5018 4.4979Z"
                  fill="#838383"
                />
              </svg>
            </button>
          </div>
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
                  <div className={styles.hour_cell}>{hour}</div>
                  {calendarFormat === "week" ? (
                    days.map((day, index) => (
                      <div key={index} className={styles.calendar_cell}>
                        {hour === 9 && day === "Monday" && <p>Hello</p>}
                      </div>
                    ))
                  ) : (
                    <div
                      className={`${styles.calendar_cell} ${styles.cell_row}`}
                    >
                      {events &&
                        events
                          .filter((event) => event.hour === hour)
                          .map((event) => (
                            <motion.div
                              className={styles.event_container}
                              onClick={setIsOpen}
                              key={event.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className={styles.event_name}>
                                <img src={eventName} alt="" />
                                <p>{event.name}</p>
                              </div>
                              <div className={styles.visitors}>
                                <div className={styles.visitors_item}>
                                  <img src={adultIcon} alt="" />
                                  <p>{event.adult}</p>
                                </div>
                                <div className={styles.visitors_item}>
                                  <img src={kidIcon} alt="" />
                                  <p>{event.kid}</p>
                                </div>
                                <div className={styles.visitors_item}>
                                  <img src={babyIcon} alt="" />
                                  <p>{event?.baby}</p>
                                </div>
                                <div className={styles.visitors_item}>
                                  <img src={teenagerIcon} alt="" />
                                  <p>0</p>
                                </div>
                                <div className={styles.visitors_item_card}>
                                  <img src={cardsIcon} alt="" />
                                  <p>{event.card ? event.card : "-"}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
