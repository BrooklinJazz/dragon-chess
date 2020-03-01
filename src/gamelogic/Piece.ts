import {
  positionNumbers,
  positions as allPositions
} from "../constants/positions";
import { IPiece } from "../constants/pieces";
import { letterFromPosition, numberFromPosition } from "../helpers.ts";
import { pipe } from "../helpers.ts/pipe";
import { incForwardPosition, getRightPosition } from "./PieceFactory";
import { Position } from "./Position";

export class Piece {
  public position: Position
  constructor(public piece: IPiece, public allTakenPositions: string[]) {
    // should not include pieces location in taken positions
    // this interferes with logic such as getAllForwardPositions
    this.allTakenPositions = allTakenPositions.filter(
      each => each !== piece.position
    );
    this.position = new Position(piece.position)
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
    let { number, letter } = this.getPositionDetails(position);
    let fwdPositions = [];
    while (number < positionNumbers.length) {
      fwdPositions.push(`${letter}${number}`);
      number++;
    }
    return fwdPositions;
  };
  getForwardPositions = (amount: number) => {
    let positions = [];
    let currentPosition = this.getPosition();
    // TODO refactor this for loop
    for (let index = 0; index < amount; index++) {
      const nextPosition = incForwardPosition(currentPosition);
      positions.push(nextPosition);
      currentPosition = nextPosition;
    }
    return positions;
  };
  getRightPositions = (amount: number) => {
    let positions = [];
    let currentPosition = this.getPosition();
    // TODO refactor this for loop
    for (let index = 0; index < amount; index++) {
      const nextPosition = getRightPosition(currentPosition);
      positions.push(nextPosition);
      currentPosition = nextPosition;
    }
    return positions;
  };
  validMovePositions = (): string[] => {
    return pipe(
      this.filterInsideBoard,
      this.filterOutBlocked
    )(this.movePositions());
  };
  filterOutBlocked = (positions: string[]): string[] => {
    throw new Error("NYI");
  };
  filterInsideBoard = (positions: string[]) =>
    positions.filter(position => allPositions.some(each => each === position));
}
