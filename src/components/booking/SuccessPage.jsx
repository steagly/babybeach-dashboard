import styles from "./SuccessPage.module.css";

export default function SuccessPage() {
  return (
    <div className={styles.container}>
      <div className={styles.success_info}>
        <h1>CONGRATULATIONS!</h1>
        <p>Your booking is successfull</p>
      </div>
    </div>
  );
}
