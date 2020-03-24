import { IPiece, D1King, H1Rook } from "../constants/pieces";
import { selectValidPositions } from "../redux/selectors";
import { IGameState } from "../redux/types";
import { Player } from "../redux/types";
import { G1, F1 } from "../constants/positions";

export class Game {
  public state: IGameState;
  constructor(state: IGameState) {
    this.state = state;
  }

  exec = (fn: () => IGameState, validator: boolean = true) => {
    if (this.state.player === this.state.turn && validator) {
      return fn();
    }
    return this.state;
  };

  initiateMove = ({ piece }: { piece: IPiece }) => {
    return this.exec(() => this.initiateMoveImpl(piece), this.state.player === piece.player);
  }

  initiateMoveImpl = (piece: IPiece) => ({
    ...this.state,
    movingPiece: piece
  });

  // TODO extract this logic
  isFirstMove = () => {
    return this.state.movingPiece && this.state.movingPiece.position === this.state.movingPiece.initialPosition
  }

  // TODO improve conditional accuracy
  isCastling = (position: string) => {
    return position === G1 && this.state.movingPiece!.id === D1King.id && this.isFirstMove()
  }

  castle = (position: string) => {
    return this.exec(() => this.castleImpl(position))
  }

  // TODO make work with more than G1
  castleImpl = (position: string) => {
    return {
      ...this.state,
      pieces: this.state.pieces.map(each => {
        if (each.id == this.state.movingPiece!.id) {
          return {...each, position, hasMoved: true}
        } else if (each.id === H1Rook.id) {
          return {...each, position: F1, hasMoved: true}
        } else {
          return each
        }
      }),
      movingPiece: undefined,
      turn: this.state.turn === Player.white ? Player.black : Player.white
    }
  }

  movePiece = ({ position }: { position: string }): IGameState => {
    // TODO REFACTOR
    if (this.isCastling(position)) {
      return this.exec(() => this.castle(position))
    }
    const isValidPosition: boolean = Boolean(
      selectValidPositions({ game: this.state }).some(
        (each: string) => each === position
      ) && this.state.movingPiece
    );
    return this.exec(() => this.movePieceImpl(position), isValidPosition);
  };

  movePieceImpl = (position: string) => {
    const killPiece = (piece: IPiece) => piece.position !== position
    const insertPiece = (piece: IPiece) => piece.id === this.state.movingPiece!.id ? { ...piece, position, hasMoved: true } : piece
    return {
      ...this.state,
      pieces: this.state.pieces.filter(killPiece).map(insertPiece),
      movingPiece: undefined,
      turn: this.state.turn === Player.white ? Player.black : Player.white
    }
  };

  cancelMove = () => this.exec(() => this.cancelMoveImpl());

  cancelMoveImpl = () => ({
    ...this.state,
    movingPiece: undefined
  });
}
