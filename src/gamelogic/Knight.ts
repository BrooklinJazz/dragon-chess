import { Piece } from "./Piece";
import { pipe } from "../helpers.ts/pipe";

export class Knight extends Piece {
  movePositions = (): (string | undefined)[] => {
    const upLeft = this.up().up().left().value()
    const upRight = this.up().up().right().value()
    const rightUp = this.right().right().up().value()
    const rightDown = this.right().right().down().value()
    const downRight = this.down().down().right().value()
    const downLeft = this.down().down().left().value()
    const leftDown = this.left().left().down().value()
    const leftUp = this.left().left().up().value()
    return [
      upLeft,
      upRight,
      rightUp,
      rightDown,
      downRight,
      downLeft,
      leftDown,
      leftUp
    ];
  };

  validMovePositions = (): string[] => pipe(
    this.filterOutUndefined,
    this.filterOutFriendlyPositions
  )(this.movePositions());
}
