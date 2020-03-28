import { Piece } from "./Piece";
import { pipe } from "../helpers.ts/pipe";
import { PieceFactory } from "./PieceFactory";
import { Player } from "../redux/types";
import { G1, C1, D1, B1, F1 } from "../constants/positions";
import { H1Rook, A1Rook } from "../constants/pieces";

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
  isA1RooksFirstMove = () => this.friendlyPieces.some(each => each.id === A1Rook.id && !each.hasMoved)
  // TODO add black player logic

  validateKingSideCastle() {
    const isBlocked = this.allTakenPositions.some(each => [F1, G1].includes(each))
    return !isBlocked && this.isFirstMove() && this.isH1RooksFirstMove()
  }

  validateQueenSideCastle() {
    const isBlocked = this.allTakenPositions.some(each => [B1, C1, D1].includes(each))
    return !isBlocked && this.isFirstMove() && this.isA1RooksFirstMove()
  }

  addCastlingMoves = (positions: string[]) => {
    let clonedPositions = [...positions]
    if (this.validateKingSideCastle()) {
      clonedPositions.push(G1)
    }
    if (this.validateQueenSideCastle()) {
      clonedPositions.push(C1)
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
