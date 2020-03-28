import { Piece } from "./Piece";
import { pipe } from "../helpers.ts/pipe";
import { PieceFactory } from "./PieceFactory";
import { Player } from "../redux/types";
import { G1, C1, D1, B1, F1, D8, C8, B8, G8, F8 } from "../constants/positions";
import { H1Rook, A1Rook, IPiece, A8Rook, H8Rook } from "../constants/pieces";

export class King extends Piece {
  baseMovePositions = (): (string | undefined)[] => {
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

  // TODO add black player logic
  checkIsFirstMove(piece: IPiece) {
    return this.pieces.some(each => each.id === piece.id && !each.hasMoved);
  }

  isBlocked(...positions: string[]) {
    return this.allTakenPositions.some(each => positions.includes(each));
  }

  validateWhiteKingSideCastle() {
    return (
      this.isWhite() &&
      !this.isBlocked(F1, G1) &&
      this.isFirstMove() &&
      this.checkIsFirstMove(H1Rook)
    );
  }

  validateWhiteQueenSideCastle() {
    return (
      this.isWhite() &&
      !this.isBlocked(B1, C1, D1) &&
      this.isFirstMove() &&
      this.checkIsFirstMove(A1Rook)
    );
  }

  validateBlackQueenSideCastle() {
    return (
      this.isBlack() &&
      !this.isBlocked(B8, C8, D8) &&
      this.isFirstMove() &&
      this.checkIsFirstMove(A8Rook)
    );
  }
  validateBlackKingSideCastle() {
    return (
      this.isBlack() &&
      !this.isBlocked(F8, G8) &&
      this.isFirstMove() &&
      this.checkIsFirstMove(H8Rook)
    );
  }

  addCastlingMoves = (positions: string[]) => {
    let clonedPositions = [...positions];
    if (this.validateWhiteKingSideCastle()) {
      clonedPositions.push(G1);
    }
    if (this.validateWhiteQueenSideCastle()) {
      clonedPositions.push(C1);
    }
    if (this.validateBlackQueenSideCastle()) {
      clonedPositions.push(C8);
    }
    if (this.validateBlackKingSideCastle()) {
      clonedPositions.push(G8);
    }
    return [...clonedPositions];
  };

  movePositionsAfterUniqueFilters = (): string[] =>
    pipe(
      this.filterOutUndefined,
      this.filterOutFriendlyPositions,
      this.addCastlingMoves
    )(this.baseMovePositions());
}
