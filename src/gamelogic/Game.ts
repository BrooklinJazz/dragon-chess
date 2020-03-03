import { IPiece } from "../constants/pieces";
import { selectValidPositions } from "../redux/selectors";
import { IGameState } from "../redux/game";
export class Game {
  public state: IGameState;
  constructor(state: IGameState) {
    this.state = state;
  }
  exec = (fn: () => IGameState, validator: boolean = true) => {
    if (this.state.player === this.state.turn && validator) {
      return fn();
    }
    return this.state
  };

  initiateMoveImpl = (piece: IPiece) => ({
    ...this.state,
    movingPiece: piece
  });

  initiateMove = ({ piece }: { piece: IPiece }) =>
    this.exec(() => this.initiateMoveImpl(piece));

    movePieceImpl = (position: string) => ({
      ...this.state,
      pieces: this.state.pieces.map(each =>
        each.id === this.state.movingPiece!.id ? { ...each, position } : each
      ),
      movingPiece: undefined
    })

  movePiece = ({ position }: { position: string }): IGameState => {
    const isValidPosition: boolean = Boolean(selectValidPositions({ game: this.state }).some((each: string) => each === position) && this.state.movingPiece)
    return this.exec(() => this.movePieceImpl(position), isValidPosition)
  };

  cancelMove = () => {
    return {
      ...this.state,
      movingPiece: undefined
    };
  };
}
