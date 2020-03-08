import { Piece } from "./Piece";
import { pipe } from "../helpers.ts/pipe";
import { C2, A3, D2, E3, F4, G5, H6 } from "../constants/positions";
import { Position } from "./Position";

export class Bishop extends Piece {
  all = (fn: () => Position, total: string[] = []): string[] => {
      const position = fn()
    const returnVal = position.tempValue();
    if (!returnVal || this.friendlyPositions.some(each => each === returnVal)) {
      position.revert();
      return total;
    }
    if (this.opponentPositions.some(each => each === returnVal)) {
      position.revert();
      return total.concat(returnVal)
    }
    return this.all(fn, total.concat(returnVal));
  };

  movePositions = (): (string | undefined)[] => {
    const upRight = this.all(this.upRight);
    const upLeft = this.all(this.upLeft);
    const downRight = this.all(this.downRight);
    const downLeft = this.all(this.downLeft);
    return [...upRight, ...upLeft, ...downRight, ...downLeft];
  };

  validMovePositions = (): string[] =>
    this.movePositions().filter(each => each) as string[];
}
