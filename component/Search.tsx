import React, { useState, SyntheticEvent } from "react";
import Header from "../component/Header";
import Form from "../component/Form";
import Input from "../component/Input";

interface Props {
  handleSubmit: Function;
}

const Search = ({ handleSubmit }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  function handleInputChange(event: SyntheticEvent) {
    const input = event.target as HTMLInputElement;
    setSearchValue(input.value);
  }

  return (
    <>
      <Header
        firstLine="Find your "
        secondLine="favourite"
        colourText=" movies"
      />
      <Form handleSubmit={handleSubmit} searchValue={searchValue}>
        <Input
          value={searchValue}
          setValue={handleInputChange}
          label={"Find a movie..."}
          name="text"
        />
        <button type="submit">Find Movie</button>
      </Form>
    </>
  );
};

export default Search;
