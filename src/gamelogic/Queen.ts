import { Piece } from "./Piece";
import { pipe } from "../helpers.ts/pipe";
import { C2, A3, D2, E3, F4, G5, H6 } from "../constants/positions";
import { Position } from "./Position";

export class Queen extends Piece {
  movePositions = (): (string | undefined)[] => {
    const up = this.all(this.up);
    const left = this.all(this.left);
    const right = this.all(this.right);
    const down = this.all(this.down);
    const upRight = this.all(this.upRight);
    const upLeft = this.all(this.upLeft);
    const downRight = this.all(this.downRight);
    const downLeft = this.all(this.downLeft);
    return [...up, ...left, ...right, ...down, ...upRight, ...upLeft, ...downRight, ...downLeft];
  };

  validMovePositions = (): string[] =>
    this.movePositions().filter(each => each) as string[];
}
