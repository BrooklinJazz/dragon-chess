import { IPiece, Pieces } from "../constants/pieces";
import { Pawn } from "./Pawn";
import { letterFromPosition, numberFromPosition } from "../helpers.ts";
import { positionLetters } from "../constants/positions";

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

export class PieceFactory {
  static fromPiece(piece: IPiece, blockedPositions: string[]) {
    switch (piece.type) {
      case Pieces.pawn:
        return new Pawn(piece, blockedPositions);
      default:
        throw new Error();
    }
  }
}