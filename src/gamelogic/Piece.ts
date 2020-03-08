import {
  positionNumbers,
  positions as allPositions
} from "../constants/positions";
import { IPiece } from "../constants/pieces";
import { Position } from "./Position";
import { Player } from "../redux/types";

export class Piece {
  public position: Position;
  public allTakenPositions: string[];
  public opponentPositions: string[];
  public friendlyPositions: string[];
  constructor(
    public piece: IPiece,
    public whitePositions: string[],
    public blackPositions: string[]
  ) {
    // should not include pieces location in taken positions
    // this interferes with logic such as getAllForwardPositions
    this.allTakenPositions = [...whitePositions, ...blackPositions].filter(
      each => each !== piece.position
    );
    this.opponentPositions =
      piece.player === Player.white ? blackPositions : whitePositions;
    this.friendlyPositions =
      piece.player === Player.black ? blackPositions : whitePositions;
    this.position = new Position(piece.position, piece.player);
  }
  filterOutUndefined = (positions: (string | undefined)[]) => positions.filter(each => each)
  filterInsideBoard = (positions: string[]) =>
    positions.filter(position => allPositions.some(each => each === position));
  player = () => this.piece.player;
  up = () => this.position.up();
  down = () => this.position.down();
  right = () => this.position.right();
  left = () => this.position.left();
}
