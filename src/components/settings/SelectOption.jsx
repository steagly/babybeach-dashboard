import styles from "./Select.module.css";

export default function SelectOption({ option, onSelect, suffix }) {
  const { value } = option;

  return (
    <li className={styles.option} onClick={() => onSelect(value)}>
      {value} {suffix}
    </li>
  );
}
