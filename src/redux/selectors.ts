import { AppState } from "../store";
import { createSelector } from "reselect";
import { A1, A2, A3, A4 } from "../constants/positions";
import { IPiece, Pieces } from "../constants/pieces";

export const selectPieces = (state: AppState) => state.game.pieces;
export const selectPiece = (state: AppState, position: string) =>
  state.game.pieces.find(piece => piece.position === position);
export const selectMovingPiece = (state: AppState) => state.game.movingPiece;

export const selectValidPositions = createSelector(
  selectPieces,
  selectMovingPiece,
  (pieces, movingPiece) =>
    movingPiece ? PieceFactory.fromPiece(movingPiece).movePositions() : []
);

class PieceFactory {
  static fromPawn(pawn: IPiece) {
    new Pawn(pawn);
  }

  static fromPiece(piece: IPiece) {
    switch (piece.type) {
      case Pieces.pawn:
        return new Pawn(piece);
      default:
        throw new Error();
        break;
    }
  }
}

class Piece {
  constructor(public piece: IPiece) {}
  movePositions() {
    throw new Error("NYI");
  }
}

class Pawn extends Piece {
  movePositions() {
    return [A3, A4];
  }
}
