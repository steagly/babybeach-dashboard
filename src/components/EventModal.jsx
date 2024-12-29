import { motion } from "framer-motion";
import styles from "./EventModal.module.css";
import appointIcon from "../assets/appoint_editing.svg";
import adultIcon from "../assets/adult.svg";
import kidIcon from "../assets/kid.svg";
import babyIcon from "../assets/baby.svg";
import SaveIcon from "./icons/SaveIcon";
import CloseIcon from "./icons/CloseIcon";
import teenagerIcon from "../assets/teenager.svg";
import Button from "../ui/buttons/Button";
import { useEffect, useState } from "react";
import useCalendarStore from "../store/calendarStore";
import axios from "axios";
import getEvents from "../api/events";
import TrashIcon from "./icons/TrashIcon";

const initialState = {
  date: new Date().toISOString(),
  lastName: "",
  firstName: "",
  email: "",
  phone: "",
  salutation: "",
  card: null,
  participants: {
    adult: 0,
    kid: 0,
    baby: 0,
    teenager: 0,
  },
};

export default function EditEventModal({ setIsOpen, mode, variants }) {
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const deleteEvent = useCalendarStore((state) => state.deleteEvent);
  const selectedEvent = useCalendarStore((state) => state.selectedEvent);
  const setEvents = useCalendarStore((state) => state.setEvents);
  const [event, setEvent] = useState(initialState);
  const [updatedEvent, setUpdatedEvent] = useState({});
  const [loading, setLoading] = useState();

  const closeModal = () => {
    setIsOpen(false);
  };

  async function handleCreateEvent(event) {
    const { localDate, time, date, ...rest } = event;

    const dateNoTimeZone = date.split(".")[0];
    const dateUTC = new Date(dateNoTimeZone).toISOString();

    try {
      await axios.post("http://localhost:5001/api/events", {
        date: dateUTC,
        ...rest,
      });
      closeModal();
      getEvents(selectedDate, setEvents);
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
    try {
      const response = await axios.put(
        `http://localhost:5001/api/events/${event.id}`,
        updatedEvent
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
      setEvent(initialState);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEvent((prevState) => {
      if (name === "localDate") {
        const inputISODate = new Date(value).toISOString();
        const localDate = inputISODate.split("T")[0];

        const originalDate = new Date(prevState.date);
        const hours = originalDate.getHours();
        const minutes = originalDate.getMinutes();

        const updatedISODate = new Date(inputISODate);
        updatedISODate.setHours(hours);
        updatedISODate.setMinutes(minutes);

        console.log(updatedISODate.toISOString());

        setUpdatedEvent((prevState) => {
          return {
            ...prevState,
            date: updatedISODate.toISOString(),
          };
        });

        return {
          ...prevState,
          [name]: localDate,
          date: updatedISODate.toISOString(),
        };
      } else if (name === "time") {
        const [hours, minutes] = value.split(":").map(Number);

        const inputISODate = new Date(prevState.date);
        inputISODate.setHours(hours);
        inputISODate.setMinutes(minutes);

        setUpdatedEvent((prevState) => {
          return {
            ...prevState,
            date: inputISODate.toISOString(),
          };
        });

        return {
          ...prevState,
          [name]: value,
          date: inputISODate.toISOString(),
        };
      }

      setUpdatedEvent((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });

      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handlePersonChange = (type, action) => {
    setEvent((prevState) => {
      const currentValue = prevState.participants[type] || 0;
      const newValue =
        action === "increase" ? currentValue + 1 : currentValue - 1;

      const minValue = 0;
      const maxValue = 10;

      if (newValue < minValue) {
        return prevState;
      } else if (newValue > maxValue) {
        return prevState;
      }

      setUpdatedEvent((prevState) => {
        return {
          ...prevState,
          participants: {
            ...prevState.participants,
            [type]: newValue,
          },
        };
      });

      return {
        ...prevState,
        participants: {
          ...prevState.participants,
          [type]: newValue,
        },
      };
    });
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`Text copied to clipboard: ${text}`);
    });
  };

  async function getEvent(id) {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/events/${id}`
      );

      setLoading(true);

      const { date } = response.data;

      const localDateTime = new Date(date).toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
        month: "2-digit",
        year: "numeric",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });

      console.log(localDateTime);

      const localDate = date.split("T")[0];
      const time = localDateTime.split(" ")[1].substring(0, 5);

      setEvent({ ...response.data, localDate, time });
      console.log(`${localDate} - ${time}`);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (selectedEvent && mode === "edit") {
      getEvent(selectedEvent.id);
    } else if (mode === "create") {
      setEvent((prevState) => {
        const localDate = event?.date.split("T")[0];
        const time = event?.date.split("T")[1].substring(0, 5);

        return {
          ...prevState,
          localDate,
          time,
        };
      });
    }
  }, [selectedEvent, mode]);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
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
              handleCopyText(
                `${event.participants?.adult} adults ${event.participants?.kid} kids`
              )
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
                `${event.participants?.adult === 0 ? "" : event.participants?.adult + " adult"} ${event.participants?.kid === 0 ? "" : event.participants?.kid + " kids"}`}
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
              <input
                onChange={handleChange}
                type="text"
                placeholder="Type a title"
                id="salutation"
                name="salutation"
                value={event.salutation}
              />
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
              onChange={handleChange}
              type="text"
              name="email"
              placeholder="Type a email adress name"
              id="email"
              value={event?.email}
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
              <p className={styles.person_count}>{event.participants?.kid}</p>
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
              <p className={styles.person_count}>{event.participants?.adult}</p>
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
              <p className={styles.person_count}>{event.participants?.baby}</p>
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
              <button
                onClick={() => handlePersonChange("teenager", "decrease")}
              >
                -
              </button>
              <p className={styles.person_count}>
                {event.participants?.teenager}
              </p>
              <button
                onClick={() => handlePersonChange("teenager", "increase")}
              >
                +
              </button>
            </div>
          </div>
          <div>Card</div>
          <button>12</button>
        </div>
        <div className={styles.modal_footer}>
          <p>Created at 17.06.2024 * 21:43</p>
          <div className={styles.footer_btns}>
            <Button variant="primary_outline" onClick={() => closeModal()}>
              <CloseIcon width={16} height={16} /> Cancel
            </Button>
            {mode === "edit" && (
              <Button variant="danger" onClick={() => handleDeleteEvent(event)}>
                <TrashIcon width={16} height={16} /> Delete
              </Button>
            )}
            <Button
              variant="success"
              onClick={
                mode === "edit"
                  ? () => handleUpdateEvent(event)
                  : () => handleCreateEvent(event)
              }
            >
              <SaveIcon />
              {mode === "edit" ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
