import React, { useState, useEffect } from "react";
import arrowLeft from "../assets/arrow_left.svg";
import arrowRight from "../assets/arrow_right.svg";
import styles from "./Calendar.module.css";
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
import getEvents from "../api/events";

export default function Calendar() {
  const setIsOpen = useModalStore((state) => state.setIsOpen);
  const mode = useModalStore((state) => state.mode);
  const setMode = useModalStore((state) => state.setMode);

  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);
  const calendarFormat = useCalendarStore((state) => state.calendarFormat);
  const setCalendarFormat = useCalendarStore(
    (state) => state.setCalendarFormat
  );

  const events = useCalendarStore((state) => state.events);
  const setEvents = useCalendarStore((state) => state.setEvents);
  const setSelectedEvent = useCalendarStore((state) => state.setSelectedEvent);

  const handleDateButton = (currentDate) => {
    setSelectedDate(currentDate);
    setCalendarFormat("day");
  };

  const handleCreateEvent = () => {
    setMode("create");
    setIsOpen();
  };

  const handleEditEvent = (event) => {
    setMode("edit");
    setSelectedEvent(event);
    setIsOpen();
  };

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

  useEffect(() => {
    if (selectedDate) {
      getEvents(selectedDate, setEvents);
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

  const hours = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17"];

  return (
    <>
      <Overlay mode={mode} />
      <Header sectionName={"Calendar"} />
      <motion.div
        className={styles.calendar_container}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <DatePicker
            changeDay={handleDateButton}
            selectedDate={selectedDate}
          />
          <button
            className={styles.create_appo_btn}
            onClick={() => handleCreateEvent("create")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20px"
              height="20px"
            >
              <path
                d="M19 19V8H5V19H19M16 1H18V3H19C20.11 3 21 3.9 21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.89 3.89 3 5 3H6V1H8V3H16V1M11 9.5H13V12.5H16V14.5H13V17.5H11V14.5H8V12.5H11V9.5Z"
                fill="#ffffff"
              />
            </svg>
            Create a new appointment
          </button>
        </div>
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
                      onDoubleClick={handleCreateEvent}
                    >
                      {events &&
                        events
                          .filter((event) => {
                            const date = new Date(event.date);
                            return (
                              date
                                .toISOString()
                                .split("T")[1]
                                .substring(0, 2) === hour
                            );
                          })
                          .map((event) => (
                            <motion.div
                              className={styles.event_container}
                              onClick={() => handleEditEvent(event)}
                              key={event.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className={styles.event_name}>
                                <img src={eventName} alt="" />
                                <p>{`${event.firstName} ${event.lastName}`}</p>
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
