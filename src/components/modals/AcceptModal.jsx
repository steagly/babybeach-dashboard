import styles from "./AddPresetModal.module.css";
import { motion } from "framer-motion";
import CloseIcon from "../icons/CloseIcon";
import TrashIcon from "../icons/TrashIcon";
import Button from "../../ui/buttons/Button";
import { useState } from "react";

export default function AcceptModal({
  variants,
  onConfirm,
  onCancel,
  currentTime,
  newTime,
}) {
  const [timeValue, setTimeValue] = useState(newTime);

  const handleTimeChange = (e) => {
    setTimeValue(e.target.value);
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}
      className={styles.modal_background}
    >
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <Button iconOnly variant="primary_outline" onClick={onCancel}>
            <CloseIcon width={14} height={14} />
          </Button>
        </div>
        <div className={styles.content_wrapper}>
          <h5>Change Event Time </h5>
          <p>Are you shure you want to change event times</p>
          <div className={styles.input_wrapper}>
            <p>
              Change time event from <span>{currentTime}</span>to
              <input
                type="time"
                value={timeValue}
                onChange={handleTimeChange}
              />
            </p>
          </div>
        </div>
        <div className={styles.buttons_wrapper}>
          <Button size="full" onClick={onCancel}>
            <CloseIcon width="18" height="18" />
            Cancel
          </Button>
          <Button variant="success" size="full" onClick={onConfirm}>
            <TrashIcon width="18" height="18" />
            Confirm
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
