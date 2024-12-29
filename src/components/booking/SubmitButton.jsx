export default function SubmitButton({
  styles,
  step,
  changeStep,
  onSubmit,
  trigger,
}) {
  return (
    <>
      {step === 1 && (
        <button type="submit" className={styles.prev_btn} onClick={changeStep}>
          Zurück
        </button>
      )}
      {step === 1 ? (
        <button
          type="submit"
          className={styles.submit_btn}
          onClick={() => {
            onSubmit();
          }}
        >
          Temin bestatigen
        </button>
      ) : (
        <button
          type="submit"
          className={styles.submit_btn}
          onClick={async () => {
            const isValid = await trigger(["selectedTimeSlot", "adultNumber"]);
            if (isValid) {
              changeStep();
            }
          }}
        >
          Weiter
        </button>
      )}
    </>
  );
}
