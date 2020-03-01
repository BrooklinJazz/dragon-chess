import { AppState } from "../store";
import { createSelector } from "reselect";
import { A1, A2, A3, A4, positionLetters } from "../constants/positions";
import { IPiece, Pieces } from "../constants/pieces";
import { letterFromPosition, numberFromPosition } from "../helpers.ts";
import { Pawn } from "../gamelogic/Pawn";

export const selectPieces = (state: AppState) => state.game.pieces;
export const selectPiece = (state: AppState, position: string) =>
  state.game.pieces.find(piece => piece.position === position);
export const selectMovingPiece = (state: AppState) => state.game.movingPiece;
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

class PieceFactory {
  static fromPiece(piece: IPiece, blockedPositions: string[]) {
    switch (piece.type) {
      case Pieces.pawn:
        return new Pawn(piece, blockedPositions);
      default:
        throw new Error();
    }
  }
}

/**
 *
 * NOTE: I have built these only thinking about forward from one perspecting
 */

export const getRightPosition = (position: string) => {
  const letter = letterFromPosition(position);
  const number = numberFromPosition(position);
  const letterIndex = positionLetters.indexOf(letter)
  // prevent forwardPosition outside board limits
  const forwardLetter = positionLetters[Math.min(letterIndex + 1, positionLetters.length - 1)]
  return `${forwardLetter}${number}`
}

// this fn is very naive. i.e. a8 => a9
export const incForwardPosition = (position: string) => {
  const letter = letterFromPosition(position);
  return `${letter}${numberFromPosition(position) + 1}`
}


