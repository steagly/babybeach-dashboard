import styles from "./Button.module.css";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  iconOnly = false,
  texOnly = false,
  ...props
}) {
  const classNames = [
    iconOnly ? styles.icon_only : styles.button,
    styles[variant],
    styles[size],
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
    </button>
  );
}
