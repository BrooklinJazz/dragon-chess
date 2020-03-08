import { letterFromPosition, numberFromPosition } from "../helpers.ts";
import { positionLetters, positionNumbers } from "../constants/positions";
import { Player } from "../redux/types";

export class Position {
  public letter: string;
  public number: number;
  public instance: {
    letter: string;
    number: number;
  };
  constructor(position: string, public player: Player = Player.white) {
    this.letter = letterFromPosition(position);
    this.number = numberFromPosition(position);
    this.player = player;
    this.instance = {
      letter: this.letter,
      number: this.number
    };
  }
  value = () => {
    const tempValue = { ...this.instance };
    if (this.instance.number <= 0 || this.instance.number > 8 || !positionLetters.includes(this.instance.letter)) {
      this.revert();
      return undefined
    }
    this.revert();
    return tempValue.letter + tempValue.number;
  };
  tempValue = () => {
    if (this.instance.number <= 0 || this.instance.number > 8 || !positionLetters.includes(this.instance.letter)) {
      return undefined
    }
    return this.position(this.instance)
  };

  exec = (fn: any) => {
    this.instance = fn()
    return this
  }

  position = ({ number, letter }: { number?: number; letter?: string } = {}) =>
    (letter || this.letter) + (number || this.number);

  newInstance = (number: number, letter: string) =>
    ({letter: letter, number: number});

  letterIndex = () => positionLetters.indexOf(this.instance.letter);

  right = () => {
    return this.exec(this.rightImpl)
  }
  rightImpl = () => {
    const letter = positionLetters[this.letterIndex() + 1];
    return this.newInstance(this.instance.number, letter || "invalid")
  };
  left = () => {
    return this.exec(this.leftImpl)
  };
  leftImpl = () => {
    const letter = positionLetters[this.letterIndex() - 1];
    return this.newInstance(this.instance.number, letter || "invalid");
  };
  up = () => {
    return this.exec(this.upImpl)
  };
  upImpl = () => {
    const number =  this.instance.number + 1;
    return this.newInstance(number, this.instance.letter);
  };
  down = () => {
    return this.exec(this.downImpl)
  };
  downImpl = () => {
    const number = this.instance.number - 1;
    return this.newInstance(number, this.instance.letter);
  };
  fwd = () => (this.player === Player.white ? this.up() : this.down());

  save = () => {
    this.letter = this.instance.letter;
    this.number = this.instance.number;
    return this;
  };
  // unused - but I anticipate the need for this.
  revert = () => {
    this.instance.letter = this.letter;
    this.instance.number = this.number;
    return this.position();
  };
}
