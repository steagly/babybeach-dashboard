import styles from "./Button.module.css";
import ArrowDatePicker from "../../components/icons/ArrowDatePicker";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  iconOnly = false,
  textOnly = false,
  isLoading = false,
  dropdown = false,
  dropdownDirection = "down",
  active = false,
  ...props
}) {
  const classNames = [
    iconOnly ? styles.icon_only : styles.button,
    styles[variant],
    styles[size],
    active ? styles.active : "",
    disabled ? styles.disabled : "",
  ].join(" ");

  return (
    <button
      className={classNames}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children && <span className={styles.children}>{children}</span>}
      {dropdown && <ArrowDatePicker direction={dropdownDirection} />}
    </button>
  );
}
