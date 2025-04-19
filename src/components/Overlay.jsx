import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import useModalStore from "../store/modalStore";
import styles from "./overlay.module.css";

const mountElement = document.getElementById("overlay");

export default function Overlay({}) {
  const isOpen = useModalStore((state) => state.isOpen);
  const ModalComponent = useModalStore((state) => state.ModalComponent);
  const modalProps = useModalStore((state) => state.modalProps);
  const mode = useModalStore((state) => state.mode);

  const variants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
  };

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.paddingRight = "";
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
          transition={{ duration: 0.2 }}
          className={styles.modal_background}
        >
          <ModalComponent mode={mode} {...modalProps} />
        </motion.div>
      )}
    </AnimatePresence>,
    mountElement
  );
}
