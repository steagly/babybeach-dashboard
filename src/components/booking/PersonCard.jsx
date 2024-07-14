import styles from "./PersonCard.module.css";
import arrowBtn from "../../assets/landing/person_change_btn.svg";

function PersonCard({ icon }) {
  return (
    <div className={styles.person_card}>
      <div className={styles.card_item}>
        <div className={styles.body_wrapper}>
          <p className={styles.title}>Kinder under 3 jahren</p>
          <img src={icon} width="68px" height="68px" alt="" />
          <p>kostenfrei</p>
        </div>
        <div className={styles.item_btns}>
          <button>
            <img src={arrowBtn} alt="" />
          </button>
          <p className={styles.number}>2</p>
          <button>
            <img src={arrowBtn} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonCard;
