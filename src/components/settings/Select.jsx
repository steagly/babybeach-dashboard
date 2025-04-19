import useSelect from "../../hooks/useSelect";
import styles from "./Select.module.css";
import SelectOption from "./SelectOption";
import ClockPlus from "../icons/ClockPlus";
import ArrowDatePicker from "../icons/ArrowDatePicker";
import { motion, AnimatePresence } from "framer-motion";

export default function Select({
  id,
  options,
  type,
  start,
  end,
  setHoursTime,
  onChange,
  suffix = null,
  size = "default",
  noBorder = false,
  defaultValue = null,
}) {
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

  function changeValue(value) {
    selectValue(value);
    if (setHoursTime) {
      setHoursTime(id, value, type);
    }
    onChange(value);
    console.log(value);
  }

  return (
    <div className={`${styles.select_container} ${styles[size]}`}>
      <div
        className={`${styles.select_box} ${noBorder && styles.no_border}`}
        onClick={toggleOpen}
        ref={selectRef}
      >
        <p className={styles.select_info}>
          {selectedValue || (type === "start" ? start : end) || defaultValue}
          {suffix && ` ${suffix}`}
        </p>
        <ArrowDatePicker direction={isOpen ? "up" : "down"} />
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
            {type && (
              <div className={styles.options_header}>
                <ClockPlus />
                {selectedValue || start || end}
              </div>
            )}
            <div className={styles.options_body}>
              {options.map((option) => (
                <SelectOption
                  key={option.id}
                  option={option}
                  onSelect={changeValue}
                  suffix={suffix}
                />
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
