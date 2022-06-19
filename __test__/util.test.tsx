import { util } from "../utils/util";

test("escapes special chars", () => {
  const stringToTest = '.Asdc "~˘homework!3 hamma';
  const newString = util.escapeTitle(stringToTest);
  expect(newString).toEqual("Asdc homework3 hamma");
});
