import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../component/Header";
import Form from "../component/Form";
import Input from "../component/Input";

test("header should be visible", () => {
  render(<Header firstLine="Test" secondLine="test" colourText="third" />);
  const myNode = document.querySelector("h1");
  expect(myNode).toBeVisible();
});

test("form should fire handleSubmit fnc", () => {
  const dummySubmit = jest.fn();
  const dummyInputChangeHandler = jest.fn();
  const { getByRole } = render(
    <Form handleSubmit={dummySubmit}>
      <Input
        value={"testValue"}
        setValue={dummyInputChangeHandler}
        label={"Find a movie..."}
        name="text"
      />
      <button type="submit">Find Movie</button>
    </Form>
  );
  fireEvent.submit(getByRole("form"));
  expect(dummySubmit).toHaveBeenCalledTimes(1);
});

test("input should fire state changer fnc", () => {
  const argText = "Find a movie...";
  const dummyInputChangeHandler = jest.fn();

  const { getByPlaceholderText } = render(
    <Input
      value={"testValue"}
      setValue={dummyInputChangeHandler}
      label={argText}
      name="text"
    />
  );

  const input = getByPlaceholderText(argText);
  console.log(input);
  fireEvent.change(input, { target: { value: "hey" } });
  expect(dummyInputChangeHandler).toBeCalled();
});
