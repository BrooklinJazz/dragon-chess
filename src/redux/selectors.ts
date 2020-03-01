import { AppState } from "../store";
import { createSelector } from "reselect";
import { A1, A2, A3, A4, positionLetters, positionNumbers, positions as allPositions } from "../constants/positions";
import { IPiece, Pieces } from "../constants/pieces";
import { letterFromPosition, numberFromPosition } from "../helpers.ts";

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
  constructor(public piece: IPiece, public allTakenPositions: string[]) {
    // should not include pieces location in taken positions
    // this interferes with logic such as getAllForwardPositions
    this.allTakenPositions = allTakenPositions.filter(each => each !== piece.position)
  }
  initialPosition = this.piece.id.split("-")[2];
  getPosition = () => this.piece.position;
  getPositionDetails = (position = this.getPosition()) => ({
    position: position, 
    letter: letterFromPosition(position), 
    number: numberFromPosition(position)
  });
  movePositions = (): string[] => {
    throw new Error("NYI");
  };
  // TODO i can extract some of this logic to make it more DRY
  allForwardPositions = (position = this.getPosition()) => {
    let {number, letter} = this.getPositionDetails(position)
    let fwdPositions = []
    while(number < positionNumbers.length) {
      fwdPositions.push(`${letter}${number}`)
      number++
    }
    return fwdPositions
  }

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

  validMovePositions = (): string[] => {
    return pipe(
      this.filterInsideBoard,
      this.filterOutBlocked
      )(this.movePositions())
  }

  filterOutBlocked = (positions: string[]): string[] => {
    throw new Error("NYI")
  }
  filterInsideBoard = (positions: string[]) => positions.filter(position => allPositions.some(each => each === position))
}

const pipe = (...fns: any[]) => (initialValue: any) => fns.reduce((value, fn) => {
  return fn(value)}, initialValue)

class Pawn extends Piece {
  isFirstMove = () => {
    // this is naive
    return this.initialPosition === this.piece.position;
  };

  filterOutBlocked = (positions: string[]) => {
    const [move1, move2] = positions
    if (this.allTakenPositions.includes(move1)) {
      return []
    } else if (this.allTakenPositions.includes(move2)) {
      return [move1]
    }
    return [move1, move2]
  }

  movePositions = () => {
    return this.isFirstMove() ? this.getForwardPositions(2) : this.getForwardPositions(1) ;
  };
}
