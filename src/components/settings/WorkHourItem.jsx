import ToggleButton from "./ToggleButton";
import WorkHourItemClosed from "./WorkHourItemClosed";
import styles from "./SettingsPage.module.css";
import TimeRangeSelector from "./TimeRangeSelector";

const selectOptions = [
  { id: 1, value: "06:00" },
  { id: 2, value: "07:00" },
  { id: 3, value: "08:00" },
  { id: 4, value: "09:00" },
  { id: 5, value: "10:00" },
  { id: 6, value: "11:00" },
  { id: 7, value: "12:00" },
  { id: 8, value: "13:00" },
  { id: 9, value: "14:00" },
  { id: 10, value: "15:00" },
  { id: 11, value: "16:00" },
  { id: 12, value: "17:00" },
  { id: 13, value: "18:00" },
  { id: 14, value: "19:00" },
  { id: 15, value: "20:00" },
  { id: 16, value: "21:00" },
  { id: 17, value: "22:00" },
  { id: 18, value: "23:00" },
  { id: 19, value: "24:00" },
];

function getWeekName(weekDay) {
  if (typeof weekDay !== "number" || weekDay < 1 || weekDay > 7) {
    return "Неверный день недели";
  }

  const weekDays = [
    null,
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ];

  return weekDays[weekDay];
}

export default function WorkHourItem({ workingHour, changeAvailability }) {
  const { id, start, weekDay, end, enabled } = workingHour;

  return (
    <div className={styles.hour_container}>
      <div className={styles.toggle_wrapper}>
        <p className={styles.day}>{getWeekName(weekDay)}</p>
        <ToggleButton
          isAvailable={enabled}
          id={id}
          onChange={changeAvailability}
        />
      </div>

      {enabled ? (
        <TimeRangeSelector
          start={start}
          end={end}
          options={selectOptions}
          id={id}
        />
      ) : (
        <WorkHourItemClosed />
      )}
    </div>
  );
}
