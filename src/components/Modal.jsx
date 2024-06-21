import { motion } from "framer-motion";
import styles from "./modal.module.css";
import appointIcon from "../assets/appoint_editing.svg";
import adultIcon from "../assets/adult.svg";
import kidIcon from "../assets/kid.svg";
import babyIcon from "../assets/baby.svg";
import teenagerIcon from "../assets/teenager.svg";
import { useEffect, useState } from "react";
import useCalendarStore from "../store/calendarStore";
import axios from "axios";

export default function Modal({ setIsOpen }) {
  const selectedEvent = useCalendarStore((state) => state.selectedEvent);
  const setSelectedEvent = useCalendarStore((state) => state.setSelectedEvent);
  const [event, setEvent] = useState({});

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
      setEvent({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePersonChange = (type, action) => {
    setEvent((prevState) => ({
      ...prevState,
      [type]: action === "increase" ? prevState[type] + 1 : prevState[type] - 1,
    }));
  };

  async function getEvent(selectedEvent) {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/events/${selectedEvent.id}`
      );
      setEvent(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (selectedEvent) {
      getEvent(selectedEvent);
    }
  }, [selectedEvent]);

  return (
    <motion.div
      className={styles.modal_background}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2 }}
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
            <div className={styles.clipboard_item}>
              <p>Name</p>
              <p>{event && `${event.firstName} ${event.lastName}`}</p>
            </div>
            <div className={styles.clipboard_item}>
              <p>Telefon</p>
              <p>{event && event.phone}</p>
            </div>
            <div className={styles.clipboard_item}>
              <p>Date</p>
              <p>{event && new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div className={styles.clipboard_item}>
              <p>Person</p>
              <p>{event && `${event.adult} adult ${event.kid} kids`}</p>
            </div>
          </div>
          <h3>Appointment Date</h3>
          <div className={styles.appoin_datetime}>
            <input type="date" />
            <input type="time" />
          </div>
          <h3>Contact Details</h3>
          <form className={styles.contact_details}>
            <div className={styles.initials}>
              <div className={styles.initials_item}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" />
              </div>
              <div className={styles.initials_item}>
                <label htmlFor="title">First Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="firstName"
                  id="title"
                  value={event.firstName}
                />
              </div>
              <div className={styles.initials_item}>
                <label htmlFor="title">Last Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="lastName"
                  value={event.lastName}
                  id="title"
                />
              </div>
            </div>
            <div className={styles.input_input}>
              <label htmlFor="title">Email Adress</label>
              <input type="text" id="title" />
            </div>
            <div className={styles.input_input}>
              <label htmlFor="title">Telefon</label>
              <input
                onChange={handleChange}
                type="text"
                name="phone"
                value={event.phone}
                id="title"
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
                <p>{event.kid}</p>
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
                <p>{event.adult}</p>
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
                <p>{event.baby}</p>
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
                <p>1</p>
                <button>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
