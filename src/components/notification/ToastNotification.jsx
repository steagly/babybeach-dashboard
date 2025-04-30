import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import styles from "./ToastNotification.module.css";
import ToastItem from "./ToastItem";

import useToastNotificationStore from "../../store/toastNotificationStore";

const mountElement = document.getElementById("overlay");

export default function ToastNotification() {
  const notifications = useToastNotificationStore(
    (state) => state.notifications
  );
  const setNotification = useToastNotificationStore(
    (state) => state.setNotification
  );

  const removeNotification = useToastNotificationStore(
    (state) => state.removeNotification
  );

  return createPortal(
    <div className={styles.notifications}>
      <AnimatePresence>
        {notifications.length > 0 &&
          notifications.map((notification) => {
            return (
              <ToastItem key={notification.id} notification={notification} />
            );
          })}
      </AnimatePresence>
    </div>,
    mountElement
  );
}
