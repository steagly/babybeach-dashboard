import styles from "./SettingsPage.module.css";
import AccordionHeader from "./AccordionHeader";
import useAccordionState from "../../hooks/useAccordionState";

export default function AccordionItem({ sectionName, children }) {
  const { isAccordionOpen, setAccordionState } = useAccordionState();

  return (
    <div className={styles.main_container}>
      <AccordionHeader
        sectionName={sectionName}
        styles={styles}
        onClick={setAccordionState}
        isAccordionOpen={isAccordionOpen}
      />
      <div
        className={`${styles.accordion_body} ${isAccordionOpen ? styles.opened : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
