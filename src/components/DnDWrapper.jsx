import {
  DndContext,
  useDroppable,
  useSensor,
  MouseSensor,
  PointerSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";

import { memo, useState } from "react";

import styles from "./Calendar.module.css";

import { calculateCollisions } from "../utils/detectEventCollisions";
import getNewTimeFromPosition from "../utils/newTimeFormPosition";
import roundToGrid from "../utils/roundToGrid";

import BookingEventItem from "./BookingEventItem";
import AcceptModal from "./modals/AcceptModal";

import useCalendarStore from "../store/calendarStore";
import useModalStore from "../store/modalStore";
import useSettingsStore from "../store/settingsStore";

function DnDWrapper({ events }) {
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const gridSize = useSettingsStore((state) =>
    state.freeMovement ? 1 : (94 / 60) * state.stepInterval
  );

  const updateEventTime = useCalendarStore((state) => state.updateEventTime);

  function snapToGrid(args) {
    const { transform } = args;

    return {
      ...transform,
      y: Math.ceil(transform.y / gridSize) * gridSize,
    };
  }

  const [isActive, setIsActive] = useState(false);
  const [newTop, setNewTop] = useState({
    currentY: 0,
    newY: 0,
  });
  const [newTime, setNewTime] = useState("");

  const { setNodeRef } = useDroppable({
    id: "droppable",
  });

  const mouseSensor = useSensor(MouseSensor);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const sensors = useSensors(sensor, mouseSensor);

  function handleDragEnd(event) {
    const { active, delta } = event;

    if (active) {
      const currentTop = active.data.current.top;
      const newTop = currentTop + delta.y;
      const roundedTop = roundToGrid(newTop, gridSize);

      const newTime = getNewTimeFromPosition(roundedTop);
      const currentTime = getNewTimeFromPosition(currentTop);

      updateEventTime(active.id, newTime);

      openModal(AcceptModal, {
        id: "acceptModal",
        onConfirm: () => {
          updateEventTime(active.id, newTime);
          closeModal();
        },
        onCancel: () => {
          const newTime = getNewTimeFromPosition(currentTop);
          updateEventTime(active.id, newTime);
          closeModal();
        },
        currentTime: currentTime,
        newTime: newTime,
      });
    }
    setIsActive(false);
  }

  function handleDragMove(event) {
    const { active, delta } = event;

    if (!active) {
      setIsActive(false);
    } else {
      setIsActive(true);
      const currentTop = active.data.current.top;
      const newTop = currentTop + delta.y;
      const roundedTop = Math.round(newTop / gridSize) * gridSize;

      const newTime = getNewTimeFromPosition(roundedTop);

      setNewTop({ currentY: currentTop, newY: roundedTop });
      setNewTime(newTime);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      modifiers={[
        restrictToVerticalAxis,
        restrictToParentElement,
        restrictToWindowEdges,
        snapToGrid,
      ]}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      autoScroll={true}
    >
      <div className={styles.test_container}>
        <div
          className={styles.timeline}
          style={{
            display: isActive ? "block" : "none",
            transform: `translateY(${newTop.newY}px)`,
            zIndex: 99,
          }}
        >
          <p>{newTime}</p>
        </div>
        <div ref={setNodeRef} className={styles.event_wrapper}>
          {events &&
            calculateCollisions(events, 196).map((event) => {
              return <BookingEventItem key={event.id} event={event} />;
            })}
        </div>
      </div>
    </DndContext>
  );
}

export default memo(DnDWrapper);
