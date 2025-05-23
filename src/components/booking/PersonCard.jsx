import styles from "./PersonCard.module.css";
import { ArrowBtnIcon } from "../icons";

function PersonCard({
  icon,
  changePersonCount,
  children,
  type,
  bookingInfo,
  price,
  error,
}) {
  return (
    <div
      className={
        error ? `${styles.person_card} ${styles.error}` : styles.person_card
      }
    >
      <div className={styles.card_item}>
        <div className={styles.body_wrapper}>
          <p className={styles.title}>{children}</p>
          <img src={icon} width="68px" height="68px" alt="" />
          <p>{`${price} EUR`}</p>
        </div>
        <div className={styles.item_btns}>
          <button onClick={() => changePersonCount(type, "decrease")}>
            <ArrowBtnIcon className={styles.icon} />
          </button>
          <p className={styles.number}>{bookingInfo[type].count}</p>
          <button onClick={() => changePersonCount(type, "increase")}>
            <ArrowBtnIcon className={`${styles.icon} ${styles.rotate}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonCard;
