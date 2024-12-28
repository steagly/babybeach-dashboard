import Select from "./Select";
import styles from "./TimeRangeSelector.module.css";

export default function TimeRangeSelector({ start, end, options }) {
  return (
    <div className={styles.time_range_wrapper}>
      <Select options={options} type="von" start={start} />
      <Select options={options} type="bis" end={end} />
    </div>
  );
}
