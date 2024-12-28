import ExperiedStatusIcon from "../icons/ExperiedStatusIcon";
import AvaliableStatusIcon from "../icons/AvailableStatusIcon";
import BlockedStatusIcon from "../icons/BlockedStatusIcon";
import styles from "./ExtraHoursStatus.module.css";

export default function ExtraHoursStatus({ status }) {
  function getStatusStyles(status) {
    switch (status) {
      case "blocked":
        return {
          icon: <BlockedStatusIcon />,
          style: "blocked",
          title: "Gesperrt",
        };
      case "experied":
        return {
          icon: <ExperiedStatusIcon />,
          style: "experied",
          title: "Abgelaufen",
        };
      case "available":
        return {
          icon: <AvaliableStatusIcon />,
          style: "available",
          title: "Buchbar",
        };
      default:
        return {
          icon: "default-icon",
          style: "default",
        };
    }
  }

  const { icon, style, title } = getStatusStyles(status);

  return (
    <div className={`${styles.status} ${styles[style]}`}>
      {icon} {title}
    </div>
  );
}
