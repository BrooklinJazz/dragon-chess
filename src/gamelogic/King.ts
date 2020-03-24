import { Piece } from "./Piece";
import { pipe } from "../helpers.ts/pipe";
import { PieceFactory } from "./PieceFactory";
import { Player } from "../redux/types";
import { G1 } from "../constants/positions";
import { H1Rook } from "../constants/pieces";

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

  // TODO mondo refactor and actual logic needed
  isH1RooksFirstMove = () => this.friendlyPieces.some(each => each.id === H1Rook.id && !each.hasMoved)
  addCastlingMoves = (positions: string[]) => {
    let clonedPositions = [...positions]
    if (this.isFirstMove() && this.isH1RooksFirstMove()) {
      clonedPositions.push(G1)
    }
    return [...clonedPositions]
  }

  movePositionsAfterUniqueFilters = (): string[] =>
    pipe(
      this.filterOutUndefined,
      this.filterOutFriendlyPositions,
      this.addCastlingMoves,
    )(this.baseMovePositions());
}
