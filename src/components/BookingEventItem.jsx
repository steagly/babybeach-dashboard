import styles from "./Calendar.module.css";

import { memo } from "react";
import { useDraggable } from "@dnd-kit/core";

//icons
import adultIcon from "../assets/adult.svg";
import kidIcon from "../assets/kid.svg";
import babyIcon from "../assets/baby.svg";
import teenagerIcon from "../assets/teenager.svg";
import cardsIcon from "../assets/cards_dark.svg";
import eventNameIcon from "../assets/event_name.svg";

//stores
import useCalendarStore from "../store/calendarStore";
import useModalStore from "../store/modalStore";

// utils
import getBookingPosition from "../utils/positionOfEvent";

import EditEventModal from "./EventModal";

function BookingEventItem({ event }) {
  const setMode = useModalStore((state) => state.setMode);
  const openModal = useModalStore((state) => state.openModal);
  const setSelectedEvent = useCalendarStore((state) => state.setSelectedEvent);

  const date = new Date(event.date);

  const endDate = new Date(date.getTime());
  endDate.setMinutes(date.getMinutes() + 45);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const endHours = String(endDate.getHours()).padStart(2, "0");
  const endMinutes = String(endDate.getMinutes()).padStart(2, "0");

  const start = `${hours}:${minutes}`;
  const end = `${endHours}:${endMinutes}`;

  const { top, height } = getBookingPosition(start, end);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: event.id,
    data: {
      top: top,
    },
  });

  const transformStyle = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        zIndex: 98,
      }
    : {};

  const handleEditEvent = (event) => {
    setMode("edit");
    setSelectedEvent(event);
    openModal(EditEventModal);
  };

  const { participants } = event;

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "absolute",
        top: top,
        left: event.left,
        ...transformStyle,
      }}
      className={styles.event_container}
      {...listeners}
      {...attributes}
      onClick={() => handleEditEvent(event)}
    >
      <div className={styles.event_name}>
        <img src={eventNameIcon} alt="" />
        <p>{`${event.firstName} ${event.lastName}`}</p>
      </div>
      <div className={styles.visitors}>
        <div className={styles.visitors_item}>
          <img src={adultIcon} alt="" />
          <p>{participants.adult}</p>
        </div>
        <div className={styles.visitors_item}>
          <img src={kidIcon} alt="" />
          <p>{participants.kid}</p>
        </div>
        <div className={styles.visitors_item}>
          <img src={babyIcon} alt="" />
          <p>{participants.baby}</p>
        </div>
        <div className={styles.visitors_item}>
          <img src={teenagerIcon} alt="" />
          <p>{participants.teenager}</p>
        </div>
        <div className={styles.visitors_item_card}>
          <img src={cardsIcon} alt="" />
          <p>{event.card ? event.card : "-"}</p>
        </div>
      </div>
    </div>
  );
}

export default memo(BookingEventItem);
