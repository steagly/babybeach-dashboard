import styles from "./WorkHourItem.module.css";
import MoonClosed from "../icons/MoonClosed";
import { motion } from "framer-motion";

export default function WorkHourItemClosed() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "linear" }}
      className={styles.closed_body}
    >
      <MoonClosed />
      <p>Geschlossen</p>
    </motion.div>
  );
}
