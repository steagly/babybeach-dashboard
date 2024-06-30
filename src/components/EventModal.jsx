import { motion } from "framer-motion";
import styles from "./EventModal.module.css";
import appointIcon from "../assets/appoint_editing.svg";
import adultIcon from "../assets/adult.svg";
import kidIcon from "../assets/kid.svg";
import babyIcon from "../assets/baby.svg";
import teenagerIcon from "../assets/teenager.svg";
import { useEffect, useState } from "react";
import useCalendarStore from "../store/calendarStore";
import axios from "axios";
import getEvents from "../api/events";

export default function EditEventModal({ setIsOpen, mode }) {
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const deleteEvent = useCalendarStore((state) => state.deleteEvent);
  const selectedEvent = useCalendarStore((state) => state.selectedEvent);
  const setEvents = useCalendarStore((state) => state.setEvents);
  const [event, setEvent] = useState({});

  const closeModal = () => {
    setIsOpen(false);
  };

  async function handleCreateEvent(event) {
    try {
      await axios.post("http://localhost:5001/api/events", event);
      closeModal();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleDeleteEvent(event) {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/events/${event.id}`
      );

      if (response.status === 200) {
        deleteEvent(event.id);
        closeModal();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleUpdateEvent(event) {
    const { time, localDate, ...eventToSend } = event;

    try {
      const response = await axios.put(
        `http://localhost:5001/api/events/${event.id}`,
        eventToSend
      );

      if (response.status === 200) {
        console.log("Event updated successfully!");
        getEvents(selectedDate, setEvents);
        closeModal();
      }
    } catch (error) {
      console.error("Error updating event:", error.message);
    }
  }

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
      setEvent({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEvent((prevState) => {
      if (name === "localDate") {
        const inputISODate = new Date(value).toISOString();
        const localDate = inputISODate.split("T")[0];

        const originalDate = new Date(prevState.date);
        const hours = originalDate.getUTCHours();
        const minutes = originalDate.getUTCMinutes();

        const updatedISODate = new Date(inputISODate);
        updatedISODate.setUTCHours(hours);
        updatedISODate.setUTCMinutes(minutes);

        return {
          ...prevState,
          [name]: localDate,
          date: updatedISODate.toISOString(),
        };
      } else if (name === "time") {
        const [hours, minutes] = value.split(":").map(Number);

        const inputISODate = new Date(prevState.date);
        inputISODate.setUTCHours(hours);
        inputISODate.setUTCMinutes(minutes);

        console.log(inputISODate);

        return {
          ...prevState,
          [name]: value,
          date: inputISODate.toISOString(),
        };
      }

      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handlePersonChange = (type, action) => {
    setEvent((prevState) => {
      const newValue =
        action === "increase" ? prevState[type] + 1 : prevState[type] - 1;

      const minValue = 0;
      const maxValue = 10;

      if (newValue < minValue) {
        return prevState;
      } else if (newValue > maxValue) {
        return prevState;
      }

      return {
        ...prevState,
        [type]: newValue,
      };
    });
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`Text copied to clipboard: ${text}`);
    });
  };

  async function getEvent(selectedEvent) {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/events/${selectedEvent.id}`
      );

      const { date } = response.data;
      const localDate = date.split("T")[0];
      const time = date.split("T")[1].substring(0, 5);

      setEvent({ ...response.data, localDate, time });
      // console.log(`${localDate} - ${time}`);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (selectedEvent && mode === "edit") {
      getEvent(selectedEvent);
    } else if (mode === "create") {
      setEvent(() => {
        const event = {
          date: "2024-06-15T10:00:00.000Z",
          lastName: "",
          firstName: "",
          adult: 0,
          kid: 0,
          baby: 0,
          phone: "",
          card: null,
        };
        const localDate = event.date.split("T")[0];
        const time = event.date.split("T")[1].substring(0, 5);

        return {
          ...event,
          localDate,
          time,
        };
      });
    }
  }, [selectedEvent, mode]);

  return (
    <motion.div
      className={styles.modal_background}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.13 }}
      onClick={handleBackgroundClick}
    >
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <div className={styles.header_title}>
            <img src={appointIcon} alt="" />
            <p>Appointment Editing</p>
          </div>
          <button className={styles.close_button} onClick={closeModal}>
            x
          </button>
        </div>
        <div className={styles.modal_main}>
          <div className={styles.modal_clipboard}>
            <div
              className={styles.clipboard_item}
              onClick={() =>
                handleCopyText(`${event.firstName} ${event.lastName}`)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16px"
                height="16px"
              >
                <path
                  d="M19,3H14.82C14.25,1.44 12.53,0.64 11,1.2C10.14,1.5 9.5,2.16 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M17,11H7V9H17V11M15,15H7V13H15V15Z"
                  fill="#525252"
                />
              </svg>
              <h4>Name</h4>
              <p>{event && `${event.firstName} ${event.lastName}`}</p>
            </div>
            <div
              className={styles.clipboard_item}
              onClick={() => handleCopyText(event.phone)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16px"
                height="16px"
              >
                <path
                  d="M19,3H14.82C14.25,1.44 12.53,0.64 11,1.2C10.14,1.5 9.5,2.16 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M17,11H7V9H17V11M15,15H7V13H15V15Z"
                  fill="#525252"
                />
              </svg>
              <h4>Telefon</h4>
              <p>{event && event.phone}</p>
            </div>
            <div
              className={styles.clipboard_item}
              onClick={() =>
                handleCopyText(new Date(event.date).toLocaleDateString())
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16px"
                height="16px"
              >
                <path
                  d="M19,3H14.82C14.25,1.44 12.53,0.64 11,1.2C10.14,1.5 9.5,2.16 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M17,11H7V9H17V11M15,15H7V13H15V15Z"
                  fill="#525252"
                />
              </svg>
              <h4>Date</h4>
              <p>{event && new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div
              className={styles.clipboard_item}
              onClick={() =>
                handleCopyText(`${event.adult} adults ${event.kid} kids`)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16px"
                height="16px"
              >
                <path
                  d="M19,3H14.82C14.25,1.44 12.53,0.64 11,1.2C10.14,1.5 9.5,2.16 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M17,11H7V9H17V11M15,15H7V13H15V15Z"
                  fill="#525252"
                />
              </svg>
              <h4>Person</h4>
              <p>
                {event &&
                  `${event.adult === 0 ? "" : event.adult + " adult"} ${event.kid === 0 ? "" : event.kid + " kids"}`}
              </p>
            </div>
          </div>
          <h3>Appointment Date</h3>
          <div className={styles.appoin_datetime}>
            <input
              id="date"
              type="date"
              name="localDate"
              value={event && event.localDate}
              onChange={handleChange}
            />
            <input
              id="time"
              type="time"
              name="time"
              value={event && event.time}
              onChange={handleChange}
            />
          </div>
          <h3>Contact Details</h3>
          <form className={styles.contact_details}>
            <div className={styles.initials}>
              <div className={styles.initials_item}>
                <label htmlFor="title">Title</label>
                <input type="text" placeholder="Type a title" id="title" />
              </div>
              <div className={styles.initials_item}>
                <label htmlFor="title">First Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="firstName"
                  placeholder="Type a first name"
                  id="firstName"
                  value={event.firstName}
                />
              </div>
              <div className={styles.initials_item}>
                <label htmlFor="title">Last Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="lastName"
                  placeholder="Type a last name"
                  value={event.lastName}
                  id="lastName"
                />
              </div>
            </div>
            <div className={styles.input_input}>
              <label htmlFor="title">Email Adress</label>
              <input
                type="text"
                placeholder="Type a email adress name"
                id="email"
              />
            </div>
            <div className={styles.input_input}>
              <label htmlFor="title">Telefon</label>
              <input
                onChange={handleChange}
                type="text"
                name="phone"
                placeholder="Type a phone"
                value={event.phone}
                id="phone"
              />
            </div>
          </form>
          <div className={styles.person_number}>
            <div className={styles.person_number_item}>
              <div className={styles.item_title}>
                <img src={kidIcon} alt="" />
                Kids
              </div>
              <div className={styles.person_number_buttons}>
                <button onClick={() => handlePersonChange("kid", "decrease")}>
                  -
                </button>
                <p className={styles.person_count}>{event.kid}</p>
                <button onClick={() => handlePersonChange("kid", "increase")}>
                  +
                </button>
              </div>
            </div>
            <div className={styles.person_number_item}>
              <div className={styles.item_title}>
                <img src={adultIcon} alt="" />
                Adults
              </div>
              <div className={styles.person_number_buttons}>
                <button onClick={() => handlePersonChange("adult", "decrease")}>
                  -
                </button>
                <p className={styles.person_count}>{event.adult}</p>
                <button onClick={() => handlePersonChange("adult", "increase")}>
                  +
                </button>
              </div>
            </div>
            <div className={styles.person_number_item}>
              <div className={styles.item_title}>
                <img src={babyIcon} alt="" />
                Babys
              </div>
              <div className={styles.person_number_buttons}>
                <button onClick={() => handlePersonChange("baby", "decrease")}>
                  -
                </button>
                <p className={styles.person_count}>{event.baby}</p>
                <button onClick={() => handlePersonChange("baby", "increase")}>
                  +
                </button>
              </div>
            </div>
            <div className={styles.person_number_item}>
              <div className={styles.item_title}>
                <img src={teenagerIcon} alt="" />
                Teenagers
              </div>
              <div className={styles.person_number_buttons}>
                <button>-</button>
                <p className={styles.person_count}>1</p>
                <button>+</button>
              </div>
            </div>
            <div>Card</div>
            <button>12</button>
          </div>
          <div className={styles.modal_footer}>
            <p>Created at 17.06.2024 * 21:43</p>
            <div className={styles.footer_btns}>
              <button className={styles.close_btn} onClick={closeModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                >
                  <path
                    d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                    fill="#525252"
                  />
                </svg>
                Close
              </button>
              {mode === "edit" ? (
                <button
                  className={styles.delete_btn}
                  onClick={() => handleDeleteEvent(event)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                      fill="#FFFFFF"
                    />
                  </svg>
                  Delete
                </button>
              ) : (
                ""
              )}
              {mode === "edit" ? (
                <button
                  className={styles.save_btn}
                  onClick={() => handleUpdateEvent(event)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"
                      fill="#FFFFFF"
                    />
                  </svg>
                  Save
                </button>
              ) : (
                <button
                  className={styles.save_btn}
                  onClick={() => handleCreateEvent(event)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"
                      fill="#FFFFFF"
                    />
                  </svg>
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
