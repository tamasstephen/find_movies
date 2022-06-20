import React, { SyntheticEvent } from "react";
import styles from "../styles/components/Input.module.css";

interface Props {
  value: string;
  setValue: Function;
  label: string;
  name: string;
}

const Input = ({ value, setValue, label, name }: Props) => {
  function removeFocus(event: SyntheticEvent) {
    const myEvent = event.nativeEvent as KeyboardEvent;
    console.log(event);
    if (myEvent.key === "Enter") {
      const input = event.target as HTMLInputElement;
      setTimeout(() => {
        input.blur();
      });
    }
  }

  return (
    <div>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.input}
        type="text"
        value={value}
        id={name}
        name={name}
        placeholder={label}
        onChange={(event) => setValue(event)}
        onKeyDown={(event) => removeFocus(event)}
        required
      />
    </div>
  );
};

export default Input;
