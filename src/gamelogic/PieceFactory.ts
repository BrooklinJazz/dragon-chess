import { IPiece, Pieces } from "../constants/pieces";
import { Pawn } from "./Pawn";
import { letterFromPosition, numberFromPosition } from "../helpers.ts";
import { positionLetters } from "../constants/positions";
import { Knight } from "./Knight";
import { Bishop } from "./Bishop";
import { Rook } from "./Rook";
import { Queen } from "./Queen";
import { King } from "./King";

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

// Todo refactor this to pass in state directly
export class PieceFactory {
  static fromPiece(piece: IPiece, pieces: IPiece[]) {
    switch (piece.type) {
      case Pieces.pawn:
        return new Pawn(piece, pieces);
      case Pieces.knight:
        return new Knight(piece, pieces);
      case Pieces.bishop:
        return new Bishop(piece, pieces);
      case Pieces.rook:
        return new Rook(piece, pieces);
      case Pieces.queen:
        return new Queen(piece, pieces);
      case Pieces.king:
        return new King(piece, pieces);
      default:
        throw new Error();
    }
  }
}
