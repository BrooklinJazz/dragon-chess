import { letterFromPosition, numberFromPosition } from "../helpers.ts";
import { positionLetters, positionNumbers } from "../constants/positions";

export class Position {
  public letter: string;
  public number: number;
  constructor(position: string) {
    this.letter = letterFromPosition(position);
    this.number = numberFromPosition(position);
  }
  position = () => this.letter + this.number
  letterIndex = () => positionLetters.indexOf(this.letter)
  numberIndex = () => positionNumbers.indexOf(this.number)
  right = () => {
    this.letter = positionLetters[Math.min(this.letterIndex() + 1, 8)]
  }
  left = () => {
    this.letter = positionLetters[Math.max(this.letterIndex() - 1, 0)]
  }
  up = () => {
    this.number = positionNumbers[Math.max(this.numberIndex() + 1, 8)]
  }
  down = () => {
    this.number = positionNumbers[Math.max(this.numberIndex() - 1, 0)]
  }
}
