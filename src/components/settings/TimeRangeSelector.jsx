import Select from "./Select";
import styles from "./TimeRangeSelector.module.css";
import useWorkingHoursStore from "../../store/workingHoursStore";

export default function TimeRangeSelector({ id, start, end, options }) {
  const setHoursTime = useWorkingHoursStore((state) => state.setHoursTime);

  return (
    <div className={styles.time_range_wrapper}>
      <Select
        options={options}
        type="start"
        start={start}
        id={id}
        setHoursTime={setHoursTime}
      />
      <Select
        options={options}
        type="end"
        end={end}
        id={id}
        setHoursTime={setHoursTime}
      />
    </div>
  );
}
