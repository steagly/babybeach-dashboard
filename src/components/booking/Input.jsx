import InputError from "./InputError";
import styles from "./Step2.module.css";

export default function Input({ errors, label, register, name }) {
  return (
    <div className={styles.info_input}>
      <label htmlFor="">{`${label} *`}</label>
      <input
        className={`${styles.input} ${errors[name] ? styles.error : ""}`}
        type="text"
        label={name}
        data-required="true"
        {...register(name, { required: `${label} is required` })}
      />
      {errors[name] && <InputError error={errors[name]} />}
    </div>
  );
}
