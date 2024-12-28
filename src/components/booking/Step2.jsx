import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import { useFormContext, Controller } from "react-hook-form";
import styles from "./Step2.module.css";
import Input from "./Input";
import InputError from "./InputError";

const options = [
  { value: "frau", label: "Frau" },
  { value: "herr", label: "Herr" },
  { value: "divers", label: "Divers" },
];

export default function BookingStep2() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <form className={styles.booking_details}>
        <div className={styles.initials}>
          <div className={styles.info_input}>
            <label htmlFor="">Anrede *</label>
            <select
              className={`${styles.input} ${errors.anrede ? styles.error : ""}`}
              name="salutation"
              id=""
              {...register("salutation", { required: true })}
            >
              {options.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
            {errors.anrede && <p>{errors.anrede.message}</p>}
          </div>
          <Input
            errors={errors}
            label={"Name"}
            register={register}
            name={"lastName"}
          />
          <Input
            errors={errors}
            label={"Vorname"}
            register={register}
            name={"firstName"}
          />
        </div>
        <Input
          errors={errors}
          label={"Email"}
          register={register}
          name={"email"}
        />
        <div className={styles.info_input}>
          <label htmlFor="">Mobile *</label>
          <Controller
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                inputStyle={{
                  width: "100%",
                  height: "52px",
                  border: errors.phone ? "1px solid #ea6662" : "",
                  transition: "border 0.3s",
                }}
                country={"de"}
                value={value}
                onChange={onChange}
                regions={"europe"}
                placeholder="Enter your phone number"
                inputProps={{
                  name: "phone",
                  required: true,
                }}
              />
            )}
            name="phone"
            control={control}
            rules={{ required: "Phone is required" }}
          />
          {errors.phone && <InputError error={errors.phone} />}
        </div>
      </form>
    </>
  );
}
