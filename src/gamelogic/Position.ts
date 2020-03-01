import { letterFromPosition, numberFromPosition } from "../helpers.ts";
import { positionLetters, positionNumbers } from "../constants/positions";

export class Position {
  public letter: string;
  public number: number;
  public instance: {
    letter: string;
    number: number;
  }
  constructor(position: string) {
    this.letter = letterFromPosition(position);
    this.number = numberFromPosition(position);
    this.instance = {
      letter: this.letter,
      number: this.number
    }
  }
  value = () => {
    const tempValue = {...this.instance}
    this.revert()
    return tempValue.letter + tempValue.number
  }
  position = ({number, letter}: {number?: number, letter?: string} = {}) => (letter || this.letter) +  (number || this.number)
  letterIndex = () => positionLetters.indexOf(this.instance.letter)
  right = () => {
   this.instance.letter = positionLetters[Math.min(this.letterIndex() + 1, 7)]
    return this
  }
  left = () => {
    this.instance.letter = positionLetters[Math.max(this.letterIndex() - 1, 0)]
    return this
  }
  up = () => {
    this.instance.number = Math.min(this.instance.number + 1, 8)
    return this
  }
  down = () => {
    this.instance.number = Math.max(this.instance.number - 1, 1)
    return this
  }
  save = () => {
    this.letter = this.instance.letter
    this.number = this.instance.number
    return this.position()
  }
  // unused - but I anticipate the need for this.
  revert = () => {
    this.instance.letter = this.letter
    this.instance.number = this.number 
    return this.position()
  }
}
