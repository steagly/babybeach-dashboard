import WorkCase from "../icons/WorkCase";
import ArrowDatePicker from "../icons/ArrowDatePicker";
import styles from "./SettingsPage.module.css";

export default function AccordionHeader({
  sectionName,
  onClick,
  isAccordionOpen,
}) {
  return (
    <div
      className={`${styles.select_header} ${isAccordionOpen ? styles.opened : ""}`}
      onClick={onClick}
    >
      <div className={styles.wrapper}>
        <div className={styles.setting_icon}>
          <WorkCase styles={styles} />
        </div>
        <div className={styles.title}>
          <h4>{sectionName}</h4>
          <p>Check and edit your business hours</p>
        </div>
      </div>
      <div className={styles.accordion_arrow}>
        <ArrowDatePicker />
      </div>
    </div>
  );
}
