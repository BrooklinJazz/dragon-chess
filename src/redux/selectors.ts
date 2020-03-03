import { AppState } from "../store";
import { createSelector } from "reselect";
import { A1, A2, A3, A4, positionLetters } from "../constants/positions";
import { letterFromPosition, numberFromPosition } from "../helpers.ts";
import { PieceFactory } from "../gamelogic/PieceFactory";

export const selectPieces = (state: AppState) => state.game.pieces;
export const selectPiece = (state: AppState, position: string) =>
  state.game.pieces.find(piece => piece.position === position);
export const selectMovingPiece = (state: AppState) => state.game.movingPiece;

export const selectPlayer = (state: AppState) => state.game.player;
export const selectAllTakenPositions = createSelector(
  selectPieces,
  pieces => pieces.map(each => each.position)
);

export const selectValidPositions = createSelector(
  selectMovingPiece,
  selectAllTakenPositions,
  (movingPiece, takenPositions) => {
    return movingPiece ? PieceFactory.fromPiece(movingPiece, takenPositions).validMovePositions() : []
  }
);




