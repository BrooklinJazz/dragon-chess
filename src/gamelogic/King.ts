import { Piece } from "./Piece";
import { pipe } from "../helpers.ts/pipe";
import { PieceFactory } from "./PieceFactory";
import { Player } from "../redux/types";

export class King extends Piece {
  baseMovePositions= (): (string | undefined)[] => {
    return [
      this.up().value(),
      this.left().value(),
      this.right().value(),
      this.down().value(),
      this.upRight().value(),
      this.upLeft().value(),
      this.downRight().value(),
      this.downLeft().value()
    ];
  };

  movePositionsAfterUniqueFilters = (): string[] =>
    pipe(
      this.filterOutUndefined,
      this.filterOutFriendlyPositions,
    )(this.baseMovePositions());
}
