import { Piece } from "./Piece";
import { pipe } from "../helpers.ts/pipe";
import { C2, A3, D2, E3, F4, G5, H6 } from "../constants/positions";
import { Position } from "./Position";

export class Bishop extends Piece {
  movePositions = (): (string | undefined)[] => {
    const upRight = this.all(this.upRight);
    const upLeft = this.all(this.upLeft);
    const downRight = this.all(this.downRight);
    const downLeft = this.all(this.downLeft);
    return [...upRight, ...upLeft, ...downRight, ...downLeft];
  };

  baseMovePositions = (): string[] =>
    this.movePositions().filter(each => each) as string[];
}
