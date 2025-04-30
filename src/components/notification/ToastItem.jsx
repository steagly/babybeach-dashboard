import { motion } from "framer-motion";
import styles from "./ToastNotification.module.css";
import CloseIcon from "../icons/CloseIcon";
import useToastNotificationStore from "../../store/toastNotificationStore";

export default function ToastItem({ notification }) {
  const { id, message, type } = notification;

  const removeNotification = useToastNotificationStore(
    (state) => state.removeNotification
  );

  return (
    <motion.div
      key={id}
      layout
      className={styles.notification}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.toast_content}>
        {type === "success" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
              fill="#2ECC71"
            />
          </svg>
        )}
        {type === "info" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
              fill="#B17ED0"
            />
          </svg>
        )}
        {`${type} : ${message}`}
      </div>

      <button
        className={styles.close_btn}
        onClick={() => removeNotification(id)}
      >
        <CloseIcon />
      </button>
      <motion.div
        className={`${styles.progressBar} ${styles[type] || ""}`}
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 10, ease: "linear" }}
      />
    </motion.div>
  );
}
