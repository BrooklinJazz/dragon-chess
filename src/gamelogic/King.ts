import { Piece } from "./Piece";
import { pipe } from "../helpers.ts/pipe";
import { C2, A3, D2, E3, F4, G5, H6, F1, C1 } from "../constants/positions";
import { Position } from "./Position";

export class King extends Piece {
  movePositions = (): (string | undefined)[] => {
    return [
      this.up().value(),
      this.left().value(),
      this.right().value(),
      this.down().value(),
      this.upRight().value(),
      this.upLeft().value(),
      this.downRight().value(),
      this.downLeft().value(),
    ];
  };

  validMovePositions = (): string[] => pipe(
    this.filterOutUndefined,
    this.filterOutFriendlyPositions
  )(this.movePositions())
}
