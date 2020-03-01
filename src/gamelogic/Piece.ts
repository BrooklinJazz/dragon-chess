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
    this.position = new Position(piece.position, piece.player)
  }
  filterInsideBoard = (positions: string[]) =>
    positions.filter(position => allPositions.some(each => each === position));
}
