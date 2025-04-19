import styles from "./AddPresetModal.module.css";
import { motion } from "framer-motion";
import CloseIcon from "../icons/CloseIcon";
import TrashIcon from "../icons/TrashIcon";
import Button from "../../ui/buttons/Button";
import { useRef } from "react";
import { useCreatePreset } from "../../modules/work-hours/api/useCreatePreset";
import useModalStore from "../../store/modalStore";

export default function AddPresetModal({ variants }) {
  const { newPresetWithHoursFn } = useCreatePreset();

  const closeModal = useModalStore((state) => state.closeModal);

  const handleCloseModal = () => {
    closeModal();
  };

  const inputRef = useRef();

  const showInputData = () => {
    newPresetWithHoursFn(inputRef.current.value);
    closeModal();
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
          <h5>Add New Preset</h5>
          <p>
            Create a new preset, you can change the preset's operating hours
            after creation
          </p>
          <div className={styles.input_wrapper}>
            <label htmlFor="presetName">Preset Name</label>
            <input
              id="presetName"
              type="text"
              placeholder="Winter Zeiten"
              ref={inputRef}
            />
          </div>
        </div>
        <div className={styles.buttons_wrapper}>
          <Button size="full" onClick={handleCloseModal}>
            <CloseIcon width="18" height="18" />
            Cancel
          </Button>
          <Button variant="success" size="full" onClick={showInputData}>
            <TrashIcon width="18" height="18" />
            Add Preset
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
