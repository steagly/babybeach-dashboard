import styles from "./BookingSummary.module.css";
import calendarIcon from "../../assets/landing/calendar_gradient.svg";
import timerIcon from "../../assets/landing/timer_gradient.svg";
import babyIcon from "../../assets/baby.svg";
import adultIcon from "../../assets/adult.svg";
import useBookingStore from "../../store/bookingStore";

export default function BookingSummary({ bookingInfo }) {
  const selectedTimeSlot = useBookingStore((state) => state.selectedTimeSlot);

  const formatedDate = () => {
    if (!selectedTimeSlot || !selectedTimeSlot.start) {
      return "no date";
    }

    const date = new Date(selectedTimeSlot.start);

    const formattedDate = date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
    });

    const formattedTime = date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate} ${formattedTime}`;
  };

  if (!selectedTimeSlot) {
    return null;
  }

  return (
    <div className={styles.booking_summary}>
      <div className={styles.empty}>
        <h3>Your Booking</h3>
        <div className={styles.booking_body}>
          <div className={styles.date_container}>
            <div className={styles.booking_item}>
              <img src={calendarIcon} alt="" />
              <div className={styles.date_info}>
                <p className={styles.title}>Time</p>
                <p>{formatedDate()}</p>
              </div>
            </div>
            <div className={styles.booking_item}>
              <img src={timerIcon} alt="" />
              <div className={styles.date_info}>
                <p className={styles.title}>Duration</p>
                <p>{selectedTimeSlot ? "45 minutes" : "no date"}</p>
              </div>
            </div>
          </div>
          <div className={styles.services}>
            {bookingInfo.adult.count ? (
              <div className={styles.service_item}>
                <div className={styles.service_title}>
                  <img src={adultIcon} alt="" />
                  <p>Erwaschsene</p>
                </div>
                <p>{`${bookingInfo.adult.count} x`}</p>
                <p>{`${bookingInfo.adult.price}`}</p>
              </div>
            ) : (
              ""
            )}
            {bookingInfo.kid.count ? (
              <div className={styles.service_item}>
                <div className={styles.service_title}>
                  <img src={babyIcon} alt="" />
                  <p>Kinder 3-13 </p>
                </div>
                <p>{`${bookingInfo.kid.count} x`}</p>
                <p>{`${new Intl.NumberFormat("de", { minimumFractionDigits: 2 }).format(bookingInfo.kid.price)} €`}</p>
              </div>
            ) : (
              ""
            )}
            {bookingInfo.baby.count ? (
              <div className={styles.service_item}>
                <p>Baby unter 3</p>
                <p>{`${bookingInfo.baby.count} x`}</p>
                <p>{`${bookingInfo.baby.price ? bookingInfo.baby.price : "kostenfrei"}`}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={styles.summary}>
            <p>Summary:</p>
            <p>
              {`${new Intl.NumberFormat("de", {
                minimumFractionDigits: 2,
              }).format(
                bookingInfo.kid.count * bookingInfo.kid.price +
                  bookingInfo.adult.count * bookingInfo.adult.price
              )} €`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
