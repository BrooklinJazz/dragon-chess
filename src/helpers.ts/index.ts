import { primary, secondary } from "../theme/colors";
import { oddLetters } from "../constants/positions";

export const numberTypeFromPosition = (position: string): "odd" | "even" => {
  const positionNumber = numberFromPosition(position);
  const positionLetter = letterFromPosition(position);

  const initialValue = oddLetters.includes(positionLetter) ? 1 : 0;
  const value = initialValue + positionNumber;
  if (value % 2 === 0) {
    return "even";
  } else {
    return "odd";
  }
};

export const colorFromPosition = (position: string) => {
  const numberType = numberTypeFromPosition(position);
  switch (numberType) {
    case "even":
      return primary;
    case "odd":
      return secondary;
    default:
      throw new Error(
        `colorFromPosition called with invalid position ${position}`
      );
  }
};

export const numberFromPosition = (position: string) => parseInt(position[1]);
export const letterFromPosition = (position: string) => position[0];
