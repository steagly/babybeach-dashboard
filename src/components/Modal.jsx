import { motion } from "framer-motion";
import styles from "./modal.module.css";
import appointIcon from "../assets/appoint_editing.svg";
import adultIcon from "../assets/adult.svg";
import kidIcon from "../assets/kid.svg";
import babyIcon from "../assets/baby.svg";
import teenagerIcon from "../assets/teenager.svg";

export default function Modal({ setIsOpen }) {
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <motion.div
      className={styles.modal_background}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2 }}
      onClick={handleBackgroundClick}
    >
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <div className={styles.header_title}>
            <img src={appointIcon} alt="" />
            <p>Appointment Editing</p>
          </div>
          <button className={styles.close_button} onClick={closeModal}>
            x
          </button>
        </div>
        <div className={styles.modal_main}>
          <div className={styles.modal_clipboard}>
            <div className={styles.clipboard_item}>
              <p>Name</p>
              <p>Frau Maria Vanera</p>
            </div>
            <div className={styles.clipboard_item}>
              <p>Name</p>
              <p>Frau Maria Vanera</p>
            </div>
            <div className={styles.clipboard_item}>
              <p>Name</p>
              <p>Frau Maria Vanera</p>
            </div>
            <div className={styles.clipboard_item}>
              <p>Name</p>
              <p>Frau Maria Vanera</p>
            </div>
          </div>
          <h3>Appointment Date</h3>
          <div className={styles.appoin_datetime}>
            <input type="date" />
            <input type="time" />
          </div>
          <h3>Contact Details</h3>
          <form className={styles.contact_details}>
            <div className={styles.initials}>
              <div className={styles.initials_item}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" />
              </div>
              <div className={styles.initials_item}>
                <label htmlFor="title">First Name</label>
                <input type="text" id="title" />
              </div>
              <div className={styles.initials_item}>
                <label htmlFor="title">Last Name</label>
                <input type="text" id="title" />
              </div>
            </div>
            <div className={styles.input_input}>
              <label htmlFor="title">Email Adress</label>
              <input type="text" id="title" />
            </div>
            <div className={styles.input_input}>
              <label htmlFor="title">Telefon</label>
              <input type="text" id="title" />
            </div>
          </form>
          <div className={styles.person_number}>
            <div className={styles.person_number_item}>
              <div className={styles.item_title}>
                <img src={kidIcon} alt="" />
                Kids
              </div>
              <div className={styles.person_number_buttons}>
                <button>-</button>
                <p>1</p>
                <button>+</button>
              </div>
            </div>
            <div className={styles.person_number_item}>
              <div className={styles.item_title}>
                <img src={adultIcon} alt="" />
                Adults
              </div>
              <div className={styles.person_number_buttons}>
                <button>-</button>
                <p>1</p>
                <button>+</button>
              </div>
            </div>
            <div className={styles.person_number_item}>
              <div className={styles.item_title}>
                <img src={babyIcon} alt="" />
                Babys
              </div>
              <div className={styles.person_number_buttons}>
                <button>-</button>
                <p>1</p>
                <button>+</button>
              </div>
            </div>
            <div className={styles.person_number_item}>
              <div className={styles.item_title}>
                <img src={teenagerIcon} alt="" />
                Teenagers
              </div>
              <div className={styles.person_number_buttons}>
                <button>-</button>
                <p>1</p>
                <button>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
