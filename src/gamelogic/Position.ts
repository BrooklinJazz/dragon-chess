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
  right = () => {
    this.letter = positionLetters[Math.min(this.letterIndex() + 1, 7)]
    return this.position()
  }
  left = () => {
    this.letter = positionLetters[Math.max(this.letterIndex() - 1, 0)]
    return this.position()
  }
  up = () => {
    this.number = Math.min(this.number + 1, 8)
    return this.position()
  }
  down = () => {
    this.number = Math.max(this.number - 1, 1)
    return this.position()
  }
}
