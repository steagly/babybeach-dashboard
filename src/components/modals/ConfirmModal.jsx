import styles from "./ConfirmModal.module.css";
import { motion } from "framer-motion";
import CloseIcon from "../icons/CloseIcon";
import TrashIcon from "../icons/TrashIcon";
import AlertIcon from "../icons/AlertIcon";
import Button from "../../ui/buttons/Button";

export default function ConfirmModal({ setIsOpen, variants }) {
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      className={styles.modal_background}
    >
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <Button iconOnly variant="primary_outline" onClick={handleCloseModal}>
            <CloseIcon width={14} height={14} />
          </Button>
        </div>
        <div className={styles.content_wrapper}>
          <div className={styles.alertIcon_container}>
            <div className={styles.circle_outside}>
              <div className={styles.circle_inside}>
                <AlertIcon />
              </div>
            </div>
          </div>
          <h5>Delete this extra hour</h5>
          <p>
            Are you sure you want to delete these hours? Please note, this
            action is permanent and cannot be undone.
          </p>
        </div>

        <div className={styles.buttons_wrapper}>
          <Button onClick={handleCloseModal}>
            <CloseIcon width="18" height="18" />
            Cancel
          </Button>
          <Button variant="danger">
            <TrashIcon width="18" height="18" />
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
