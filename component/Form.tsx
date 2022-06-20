import React, { SyntheticEvent } from "react";

interface Props {
  children: React.ReactElement[];
  handleSubmit: Function;
  searchValue: string;
}

const Form = ({ children, handleSubmit, searchValue }: Props) => {
  return (
    <form
      role="form"
      autoComplete="off"
      onSubmit={(event: SyntheticEvent) => handleSubmit(event, searchValue)}
    >
      {children}
    </form>
  );
};

export default Form;
