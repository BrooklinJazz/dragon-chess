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
  public friendlyPieces: IPiece[];
  public opponentPieces: IPiece[];

  constructor(
    public piece: IPiece,
    public whitePositions: string[],
    public blackPositions: string[],
    public whitePieces: IPiece[],
    public blackPieces: IPiece[]
  ) {
    // should not include pieces location in taken positions
    // this interferes with logic such as getAllForwardPositions
    this.allTakenPositions = [...whitePositions, ...blackPositions].filter(
      each => each !== piece.position
    );
    this.opponentPositions =
      piece.player === Player.white ? blackPositions : whitePositions;
    this.friendlyPieces =
      piece.player === Player.white ? whitePieces : blackPieces;
    this.opponentPieces =
      piece.player === Player.white ? blackPieces : whitePieces;
    this.friendlyPositions =
      piece.player === Player.black ? blackPositions : whitePositions;
    this.position = new Position(piece.position, piece.player);
  }
  filterOutUndefined = (positions: (string | undefined)[]): string[] =>
    positions.filter(each => each) as string[];
  filterInsideBoard = (positions: string[]) =>
    positions.filter(position => allPositions.some(each => each === position));
  filterOutFriendlyPositions = (positions: string[]) =>
    positions.reduce((total: string[], each) => {
      return this.friendlyPositions.includes(each) ? total : total.concat(each);
    }, []);

  player = () => this.piece.player;

  up = () => this.position.up();
  down = () => this.position.down();
  right = () => this.position.right();
  left = () => this.position.left();
  upLeft = () => this.up().left();
  upRight = () => this.up().right();
  downRight = () => this.down().right();
  downLeft = () => this.down().left();

  takeablePositions(): string[] {
    return this.validMovePositions()
  }
  validMovePositions(): string[] {
    throw "NYI validmovepositions"
  }

  all = (fn: () => Position, total: string[] = []): string[] => {
    const position = fn();
    const returnVal = position.tempValue();
    if (!returnVal || this.friendlyPositions.some(each => each === returnVal)) {
      position.revert();
      return total;
    }
    if (this.opponentPositions.some(each => each === returnVal)) {
      position.revert();
      return total.concat(returnVal);
    }
    return this.all(fn, total.concat(returnVal));
  };
}
