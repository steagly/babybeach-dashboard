import styles from "./ExtraWorkHours.module.css";
import AddTimeIcon from "../icons/AddTimeIcon";
import ExtraHoursStatus from "./ExtraHoursStatus";
import EditIcon from "../icons/EditIcon";
import CloseIcon from "../icons/CloseIcon";
import useModalStore from "../../store/modalStore";
import ConfirmModal from "../modals/ConfirmModal";
import Overlay from "../Overlay";
import Button from "../../ui/buttons/Button";

const data = [
  {
    records: "31.01.2025",
    startTime: "08:00",
    endTime: "10:00",
    status: "available",
    duration: "2 Stunden",
  },
  {
    records: "31.01.2025",
    startTime: "10:30",
    endTime: "12:30",
    status: "available",
    duration: "2 Stunden",
  },
  {
    records: "31.01.2025",
    startTime: "13:00",
    endTime: "14:00",
    status: "blocked",
    duration: "4 Stunden",
  },
  {
    records: "31.01.2025",
    startTime: "13:00",
    endTime: "14:00",
    status: "blocked",
    duration: "4 Stunden",
  },
  {
    records: "31.01.2025",
    startTime: "13:00",
    endTime: "14:00",
    status: "experied",
    duration: "4 Stunden",
  },
  {
    records: "31.01.2025",
    startTime: "13:00",
    endTime: "14:00",
    status: "experied",
    duration: "4 Stunden",
  },
  {
    records: "31.01.2025",
    startTime: "13:00",
    endTime: "14:00",
    status: "experied",
    duration: "4 Stunden",
  },
];

export default function ExtraWorkHours() {
  const setIsOpen = useModalStore((state) => state.setIsOpen);

  return (
    <div className={styles.wrapper}>
      <Overlay ModalElement={ConfirmModal} />
      <div className={styles.buttons_wrapper}>
        <button className={styles.button}>
          <AddTimeIcon /> <p>Neu Arbeitszeiten</p>
        </button>
        <button className={styles.button}>
          <AddTimeIcon /> <p>Alle Arbeitszeiten löshen</p>
        </button>
        <button className={styles.button}>
          <AddTimeIcon /> <p>Neu Arbeitszeiten</p>
        </button>
      </div>
      <div className={styles.table}>
        <div className={styles.table_header}>
          <div className={styles.table_header_cell}>Datum</div>
          <div className={styles.table_header_cell}>Von</div>
          <div className={styles.table_header_cell}>Bis</div>
          <div className={styles.table_header_cell}>Zustand</div>
          <div className={styles.table_header_cell}>Dauer</div>
        </div>
        <div className={styles.table_body}>
          {data.map((row, index) => (
            <div className={styles.table_row} key={index}>
              <div className={styles.table_cell}>{row.records}</div>
              <div className={styles.table_cell}>{row.startTime}</div>
              <div className={styles.table_cell}>{row.endTime}</div>
              <div className={styles.table_cell}>
                <ExtraHoursStatus status={row.status} />
              </div>
              <div className={styles.table_cell}>{row.duration}</div>
              <div className={styles.buttons_wrapper}>
                <Button iconOnly>
                  <EditIcon />
                </Button>
                <Button iconOnly onClick={() => setIsOpen()}>
                  <CloseIcon />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
