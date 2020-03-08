import { IPiece } from "../constants/pieces";
import { selectValidPositions } from "../redux/selectors";
import { IGameState } from "../redux/types";
import { Player } from "../redux/types";
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

  movePiece = ({ position }: { position: string }): IGameState => {
    const isValidPosition: boolean = Boolean(
      selectValidPositions({ game: this.state }).some(
        (each: string) => each === position
      ) && this.state.movingPiece
    );
    return this.exec(() => this.movePieceImpl(position), isValidPosition);
  };

  movePieceImpl = (position: string) => {
    const removePiece = (piece: IPiece) => piece.position !== position
    const insertPiece = (piece: IPiece) => piece.id === this.state.movingPiece!.id ? { ...piece, position } : piece
    return {
      ...this.state,
      pieces: this.state.pieces.filter(removePiece).map(insertPiece),
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
