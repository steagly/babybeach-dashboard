import styles from "./Dropdown.module.css";
import { motion } from "framer-motion";

export default function DropdownBody({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 256 }}
      transition={{
        height: { duration: 0.2, ease: "easeOut" },
        opacity: { duration: 0.15, delay: 0.05 },
      }}
      className={styles.dropdown_body}
    >
      {children}
    </motion.div>
  );
}
