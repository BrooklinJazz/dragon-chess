import { numberTypeFromPosition } from "./index";
import { A1, A2, B1, B2 } from "../constants/positions";

test("a1", () => {
  expect(numberTypeFromPosition(A1)).toEqual("even");
  expect(numberTypeFromPosition(A2)).toEqual("odd");
  expect(numberTypeFromPosition(B1)).toEqual("odd");
  expect(numberTypeFromPosition(B2)).toEqual("even");
});
