import React, { SyntheticEvent } from "react";

interface Props {
  children: React.ReactElement[];
  handleSubmit: Function;
}

const Form = ({ children, handleSubmit }: Props) => {
  return (
    <form role="form" onSubmit={(event: SyntheticEvent) => handleSubmit(event)}>
      {children}
    </form>
  );
};

export default Form;
