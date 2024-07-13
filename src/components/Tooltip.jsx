import { createPortal } from "react-dom";
import styles from "./Tooltip.module.css";
import useSideBarStore from "../store/sidebarStore";
import { motion } from "framer-motion";

const mountElement = document.getElementById("overlay");

const Tooltip = ({ children, position, visible }) => {
  const { sidebarIsOpen } = useSideBarStore();

  return createPortal(
    !sidebarIsOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.tooltip}
        style={position}
      >
        {children}
      </motion.div>
    ),
    mountElement
  );
};

export default Tooltip;
