import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../component/Header";

test("header should be visible", () => {
  render(<Header firstLine="Test" secondLine="test" colourText="third" />);
  const myNode = document.querySelector("h1");
  expect(myNode).toBeVisible();
});
