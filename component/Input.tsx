import React from "react";
import styles from "../styles/components/Input.module.css";

interface Props {
  value: string;
  setValue: Function;
  label: string;
  name: string;
}

const Input = ({ value, setValue, label, name }: Props) => {
  return (
    <div>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        id={name}
        name={name}
        onChange={(event) => setValue(event)}
      />
    </div>
  );
};

export default Input;
