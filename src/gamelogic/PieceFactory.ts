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
  static fromPiece(piece: IPiece, whitePositions: string[], blackPositions: string[], whitePieces: IPiece[], blackPieces: IPiece[]) {
    switch (piece.type) {
      case Pieces.pawn:
        return new Pawn(piece, whitePositions, blackPositions, whitePieces, blackPieces);
      case Pieces.knight:
        return new Knight(piece, whitePositions, blackPositions, whitePieces, blackPieces);
      case Pieces.bishop:
        return new Bishop(piece, whitePositions, blackPositions, whitePieces, blackPieces);
      case Pieces.rook:
        return new Rook(piece, whitePositions, blackPositions, whitePieces, blackPieces);
      case Pieces.queen:
        return new Queen(piece, whitePositions, blackPositions, whitePieces, blackPieces);
      case Pieces.king:
        return new King(piece, whitePositions, blackPositions, whitePieces, blackPieces);
      default:
        throw new Error();
    }
  }
}
