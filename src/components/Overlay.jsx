import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import useModalStore from "../store/modalStore";
import styles from "./overlay.module.css";

const mountElement = document.getElementById("overlay");

export default function Overlay({ mode = null, ModalElement }) {
  const isOpen = useModalStore((state) => state.isOpen);
  const setIsOpen = useModalStore((state) => state.setIsOpen);

  const variants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.modal_background}
        >
          <ModalElement setIsOpen={setIsOpen} mode={mode} variants={variants} />
        </motion.div>
      )}
    </AnimatePresence>,
    mountElement
  );
}
