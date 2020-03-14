import {
  positionNumbers,
  positions as allPositions
} from "../constants/positions";
import { IPiece } from "../constants/pieces";
import { Position } from "./Position";
import { Player } from "../redux/types";
import { PieceFactory } from "./PieceFactory";
import { pipe } from "../helpers.ts/pipe";

export class Piece {
  public position: Position;

  constructor(
    public piece: IPiece,
    public pieces: IPiece[]
  ) {
    this.position = new Position(piece.position, piece.player);
  }
  player = () => this.piece.player;
  isBlack = () =>  this.player() === Player.white
  isWhite = () =>  this.player() === Player.white

  public allTakenPositions = this.pieces.map(each => each.position)

  public whitePieces = this.pieces.filter(each => each.player === Player.white)
  public blackPieces = this.pieces.filter(each => each.player === Player.black)
  public blackPositions = this.blackPieces.map(each => each.position)
  public whitePositions = this.whitePieces.map(each => each.position)

  public friendlyPieces = this.isWhite() ? this.whitePieces : this.blackPieces
  public opponentPieces = this.isWhite() ? this.blackPieces : this.whitePieces

  public friendlyPositions = this.friendlyPieces.map(each => each.position)
  public opponentPositions = this.opponentPieces.map(each => each.position)

  filterOutUndefined = (positions: (string | undefined)[]): string[] =>
    positions.filter(each => each) as string[];
  filterInsideBoard = (positions: string[]) =>
    positions.filter(position => allPositions.some(each => each === position));
  filterOutFriendlyPositions = (positions: string[]) =>
    positions.reduce((total: string[], each) => {
      return this.friendlyPositions.includes(each) ? total : total.concat(each);
    }, []);


  up = () => this.position.up();
  down = () => this.position.down();
  right = () => this.position.right();
  left = () => this.position.left();
  upLeft = () => this.up().left();
  upRight = () => this.up().right();
  downRight = () => this.down().right();
  downLeft = () => this.down().left();

  takeablePositions(): string[] {
    // this avoids max call stack but is likely incorrect for validMovePositions.
    return this.movePositionsAfterUniqueFilters();
  }
  validMovePositions(): string[] {
    return pipe(
      this.filterOutLosingPositions
    )(this.movePositionsAfterUniqueFilters())
  }
  movePositionsAfterUniqueFilters(): string[] {
    throw new Error("NYI movePositionsAfterUniqueFilters");
  }
  baseMovePositions(): (string | undefined)[] {
    throw new Error("NYI movePositions");
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

  filterOutLosingPositions = (positions: string[]) => {
    return positions.filter(each => {
      const king = this.piece.type === "king" ? {
        ...this.piece,
        position: each
      }  : this.friendlyPieces.find(each => each.type === "king") || {position: undefined}
      const opponentMoves = this.possibleOpponentMoves(each)
      const moveKillsKing = opponentMoves.some(each => each === king.position)
      return !moveKillsKing
    });
  };

  possibleOpponentMoves = (move: string): string[] => {
    if (!move) {
      return [];
    }
    const newPiece = {
      ...this.piece,
      position: move
    };
    const newPieces = this.pieces.map(each => each.id === newPiece.id ? newPiece : each)
    return this.opponentPieces.filter(each => each.position !== move).reduce(
      (total: string[], opponentPiece) => {
        return [
          ...total,
          ...PieceFactory.fromPiece(
            opponentPiece,
            newPieces
          ).takeablePositions()
        ];
      },
      []
    );
  }
}
