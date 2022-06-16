import React from "react";
import styles from "../styles/components/Input.module.css";

interface Props {
  value: string;
  setValue: Function;
  name: string;
  label: string;
}

const Input = ({ value, setValue, name, label }: Props) => {
  return (
    <div>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        placeholder={label}
        type="text"
        value={value}
        name={name}
        id={name}
        onChange={(event) => setValue(event)}
      />
    </div>
  );
};

export default Input;
