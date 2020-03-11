import { AppState } from "../store";
import { createSelector } from "reselect";
import { A1, A2, A3, A4, positionLetters } from "../constants/positions";
import { letterFromPosition, numberFromPosition } from "../helpers.ts";
import { PieceFactory } from "../gamelogic/PieceFactory";
import { Player } from "./types";
import { IPiece } from "../constants/pieces";

export const selectPieces = (state: AppState) => state.game.pieces;
export const selectPiece = (state: AppState, position: string) =>
  state.game.pieces.find(piece => piece.position === position);
export const selectMovingPiece = (state: AppState) => state.game.movingPiece;
export const selectTurn = (state: AppState) => state.game.turn;

export const selectPlayer = (state: AppState) => state.game.player;
export const selectAllTakenPositions = createSelector(
  selectPieces,
  pieces => pieces.map(each => each.position)
);
export const selectAllBlackPositions = createSelector(
  selectPieces,
  pieces => pieces.reduce((total: string[], each) => each.player === Player.black ? total.concat(each.position) : total, [])
);
export const selectAllBlackPieces = createSelector(
  selectPieces,
  pieces => pieces.reduce((total: IPiece[], each) => each.player === Player.black ? total.concat(each) : total, [])
);
export const selectAllWhitePieces = createSelector(
  selectPieces,
  pieces => pieces.reduce((total: IPiece[], each) => each.player === Player.white ? total.concat(each) : total, [])
);
export const selectAllWhitePositions = createSelector(
  selectPieces,
  pieces => pieces.reduce((total: string[], each) => each.player === Player.white ? total.concat(each.position) : total, [])
);

export const selectValidPositions = createSelector(
  selectMovingPiece,
  selectAllWhitePositions,
  selectAllBlackPositions,
  selectAllWhitePieces,
  selectAllBlackPieces,
  (movingPiece, whitePositions, blackPositions, whitePieces, blackPieces) => {
    return movingPiece ? PieceFactory.fromPiece(movingPiece, whitePositions, blackPositions, whitePieces, blackPieces).validMovePositions() : []
  }
);




