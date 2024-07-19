import styles from "./PersonCard.module.css";
import arrowBtn from "../../assets/landing/person_change_btn.svg";

function PersonCard({ icon, changePersonCount, children, type, bookingInfo }) {
  return (
    <div className={styles.person_card}>
      <div className={styles.card_item}>
        <div className={styles.body_wrapper}>
          <p className={styles.title}>{children}</p>
          <img src={icon} width="68px" height="68px" alt="" />
          <p>kostenfrei</p>
        </div>
        <div className={styles.item_btns}>
          <button onClick={() => changePersonCount(type, "increase")}>
            <img src={arrowBtn} alt="" />
          </button>
          <p className={styles.number}>{bookingInfo[type]}</p>
          <button onClick={() => changePersonCount(type, "decrease")}>
            <img src={arrowBtn} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonCard;
