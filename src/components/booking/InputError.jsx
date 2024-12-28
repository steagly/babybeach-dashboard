import styles from "./InputError.module.css";
import { motion } from "framer-motion";

export default function InputError({ error, padding = 4 }) {
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <motion.p
      style={{ top: -padding }}
      className={styles.error_message}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="14px"
        height="14px"
      >
        <path
          d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
          fill="#ea6662"
        />
      </svg>
      {error?.message}
    </motion.p>
  );
}
