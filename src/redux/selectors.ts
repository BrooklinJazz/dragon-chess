import { AppState } from "../store";
import { createSelector } from "reselect";
import { A1, A2, A3, A4, positionLetters, positionNumbers, positions as allPositions } from "../constants/positions";
import { IPiece, Pieces } from "../constants/pieces";
import { letterFromPosition, numberFromPosition } from "../helpers.ts";

export const selectPieces = (state: AppState) => state.game.pieces;
export const selectPiece = (state: AppState, position: string) =>
  state.game.pieces.find(piece => piece.position === position);
export const selectMovingPiece = (state: AppState) => state.game.movingPiece;

export const selectValidPositions = createSelector(
  selectPieces,
  selectMovingPiece,
  (pieces, movingPiece) =>
    movingPiece ? PieceFactory.fromPiece(movingPiece).validMovePositions() : []
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
    }
  }
}

/**
 * 
 * NOTE: I have built these only thinking about forward from one perspecting
 */

const getRightPosition = (position: string) => {
  const letter = letterFromPosition(position);
  const number = numberFromPosition(position);
  const letterIndex = positionLetters.indexOf(letter)
  // prevent forwardPosition outside board limits
  const forwardLetter = positionLetters[Math.min(letterIndex + 1, positionLetters.length - 1)]
  return `${forwardLetter}${number}`
}

// this fn is very naive. i.e. a8 => a9
const incForwardPosition = (position: string) => {
  const letter = letterFromPosition(position);
  return `${letter}${numberFromPosition(position) + 1}`
}

class Piece {
  constructor(public piece: IPiece) {}
  initialPosition = this.piece.id.split("-")[2];
  getPosition = () => this.piece.position;
  movePositions = (): string[] => {
    throw new Error("NYI");
  };
  // TODO i can extract some of this logic to make it more DRY
  getForwardPositions = (amount: number) => {
    let positions = []
    let currentPosition = this.getPosition();
    // TODO refactor this for loop
    for (let index = 0; index < amount; index++) {
      const nextPosition = incForwardPosition(currentPosition)
     positions.push(nextPosition)
     currentPosition = nextPosition
    }
    return positions
  }
  getRightPositions = (amount: number) => {
    let positions = []
    let currentPosition = this.getPosition();
    // TODO refactor this for loop
    for (let index = 0; index < amount; index++) {
     const nextPosition = getRightPosition(currentPosition)
     positions.push(nextPosition)
     currentPosition = nextPosition
    }
    return positions
  }
}



export const isInsideBoard = (position: string) => {
  return allPositions.some(each => each === position)
}
export const insideBoard = (positions: stringp[]) => {
  return positions.filter(isInsideBoard)
}

const pipe = (...fns: any[]) => (initialValue: any) => fns.reduce((value, fn) => fn(value), initialValue)

class Pawn extends Piece {
  isFirstMove = () => {
    // this is naive
    return this.initialPosition === this.piece.position;
  };
  validMovePositions = (): string[] => {
    return pipe(insideBoard)(this.movePositions())
  }
  movePositions = () => {
    return this.isFirstMove() ? this.getForwardPositions(2) : this.getForwardPositions(1) ;
  };
}
