import styles from "./ParticipantsPerDay.module.css";
import useCalendarStore from "../store/calendarStore";

import AdultIcon from "./icons/AdultIcon";
import KidIcon from "./icons/KidIcon";
import BabyIcon from "./icons/BabyIcon";
import { memo } from "react";

function ParticipantsPerDay() {
  const participantsByDay = useCalendarStore(
    (state) => state.dayParticipants?.participantsByDay
  );

  return (
    <div className={styles.day_participants}>
      <div className={styles.participant_item}>
        <AdultIcon width="14" height="14" />
        <p>{participantsByDay?.adult ?? 0}</p>
      </div>
      <div className={styles.participant_item}>
        <KidIcon width="14" height="14" />
        <p>{participantsByDay?.kid ?? 0}</p>
      </div>
      <div className={styles.participant_item ?? 0}>
        <BabyIcon width="14" height="14" />
        <p>{participantsByDay?.baby ?? 0}</p>
      </div>
      <div className={styles.participant_item}></div>
    </div>
  );
}

export default memo(ParticipantsPerDay);
