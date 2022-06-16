import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../component/Header";

test("header should be visible", () => {
  const { getByText } = render(<Header text="Test" />);
  const myNode = getByText("Test");
  expect(myNode).toBeVisible();
});
