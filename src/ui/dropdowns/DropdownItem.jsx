import styles from "./Dropdown.module.css";

export default function DropdownItem({ children, textOnly = false }) {
  return <div className={styles.dropdown_item}>{children}</div>;
}
