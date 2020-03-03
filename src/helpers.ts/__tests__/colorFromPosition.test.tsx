import { colorFromPosition, numberFromPosition, numberTypeFromPosition } from "../index";
import {
  A1,
  A2,
  AColumn,
  BColumn,
  CColumn,
  DColumn,
  EColumn,
  FColumn,
  GColumn,
  HColumn,
  ColumnArrays
} from "../../constants/positions";
import { primary, secondary } from "../../theme/colors";

test("a1 _ primary", () => {
  expect(colorFromPosition(A1)).toEqual(primary);
});
test("color From Position", () => {
  expect(colorFromPosition(A2)).toEqual(secondary);
});

const testColumn = (column: string[]) => {
  column.forEach(each => {
      const type = numberTypeFromPosition(each)
      const expectedColor = type === "even" ? primary : secondary;
      expect(colorFromPosition(each)).toEqual(expectedColor)
  });
};

test("Columns", () => {
    ColumnArrays.forEach(column => {
        testColumn(column)
    })
});
