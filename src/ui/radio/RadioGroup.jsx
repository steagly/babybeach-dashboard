import { useState } from "react";
import styles from "./RadioButton.module.css";

import RadioButton from "./RadioButton";

export default function RadioGroup() {
  const [selected, setSelected] = useState("default");

  return (
    <div className={styles.wrapper}>
      <RadioButton
        value="default"
        text="Default with Date Picker"
        selected={selected}
        onChange={setSelected}
      />
      <RadioButton
        value="compact"
        text="Compact Format"
        selected={selected}
        onChange={setSelected}
      />
    </div>
  );
}
