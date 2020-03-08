import { configureMockStore } from "./configureMockStore";
import { Player } from "./types";
import { IPiece } from "../constants/pieces";
import { initiateMove, movePiece } from "./game";
import { selectMovingPiece, selectValidPositions, selectAllBlackPositions } from "./selectors";
import { AnyAction } from "redux";

export class Fixture {
  public store: ReturnType<typeof configureMockStore>;
  constructor() {
    this.store = configureMockStore({
      player: Player.white,
      turn: Player.white,
      pieces: [],
      movingPiece: undefined
    });
  }

  private state = () => this.store.getState();
  private game = () => this.state().game;
  private pieces = () => this.game().pieces;
  private dispatch = (action: AnyAction) => this.store.dispatch(action);
  private movingPiece = () => selectMovingPiece(this.state());
  private validPositions = () => selectValidPositions(this.state());
  private blackPositions = () => selectAllBlackPositions(this.state());

  private exec = (fn: any) => {
    fn();
    return this;
  };

  addPiece = (piece: IPiece) => this.exec(() => this.addPieceImpl(piece));

  private addPieceImpl = (piece: IPiece) => {
    this.store = configureMockStore({
      ...this.game(),
      pieces: [...this.pieces(), piece]
    });
    return this;
  };

  addPieces = (...pieces: IPiece[]) =>
    this.exec(() => this.addPiecesImpl(pieces));
  private addPiecesImpl = (pieces: IPiece[]) => {
    pieces.forEach(piece => this.addPiece(piece));
    return this;
  };

  initiateMove = (piece: IPiece) =>
    this.exec(() => this.initiateMoveImpl(piece));
  initiateMoveImpl = (piece: IPiece) => this.dispatch(initiateMove({ piece }));

  movePiece = (position: string) =>
    this.exec(() => this.movePieceImpl(position));
  movePieceImpl = (position: string) => this.dispatch(movePiece({ position }));

  assertMovingPieceMatch = (piece: IPiece) =>
    this.exec(() => this.assertMovingPieceMatchImpl(piece));
  private assertMovingPieceMatchImpl = (piece: IPiece) => {
    expect(this.movingPiece()).toEqual(piece);
  };

  assertValidPositionsMatch = (...positions: string[]) =>
    this.exec(() => this.assertValidPositionsMatchImpl(positions));
  private assertValidPositionsMatchImpl = (positions: string[]) => {
    expect(this.validPositions()).toEqual(positions);
  };

  assertBlackPositionsMatch = (...positions: string[]) =>
    this.exec(() => this.assertBlackPositionsMatchImpl(positions));
  private assertBlackPositionsMatchImpl = (positions: string[]) => {
    expect(this.blackPositions()).toEqual(positions);
  };
}