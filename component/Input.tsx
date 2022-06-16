import React from "react";

interface Props {
  value: string;
  setValue: Function;
}

const Input = ({ value, setValue }: Props) => {
  return (
    <input type="text" value={value} onChange={(event) => setValue(event)} />
  );
};

export default Input;
