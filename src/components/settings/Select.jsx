import useSelect from "../../hooks/useSelect";
import styles from "./Select.module.css";
import SelectOption from "./SelectOption";
import ClockPlus from "../icons/ClockPlus";
import { motion, AnimatePresence } from "framer-motion";

export default function Select({ options, type, start, end }) {
  const {
    isOpen,
    selectedValue,
    selectRef,
    optionsRef,
    toggleOpen,
    selectValue,
  } = useSelect();

  const variants = {
    start: { opacity: 0, maxHeight: 0 },
    end: { opacity: 1, maxHeight: "250px " },
    exit: { opacity: 0, maxHeight: 0 },
  };

  return (
    <div className={styles.select_container}>
      <div className={styles.select_box} onClick={toggleOpen} ref={selectRef}>
        <p className={styles.type}>{type}</p>
        <p className={styles.select_info}>
          {selectedValue || (type === "von" ? start : end)}
        </p>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={styles.select_list}
            variants={variants}
            initial="start"
            animate="end"
            exit="exit"
            ref={optionsRef}
          >
            <div className={styles.options_header}>
              <ClockPlus />
              {selectedValue || start || end}
            </div>
            <div className={styles.options_body}>
              {options.map((option) => (
                <SelectOption
                  key={option.id}
                  option={option}
                  onSelect={selectValue}
                />
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
