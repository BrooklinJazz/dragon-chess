import { IPiece } from "../constants/pieces";
import { selectValidPositions } from "../redux/selectors";
import { IGameState } from "../redux/game";
export class Game {
  constructor(public state: IGameState) { }
  initiateMove = ({ piece }: {
    piece: IPiece;
  }): IGameState => ({
    ...this.state,
    movingPiece: piece
  });
  movePiece = ({ position }: {
    position: string;
  }) => {
    const validPositions = selectValidPositions({ game: this.state });
    if (!this.state.movingPiece ||
      !validPositions.some(each => each === position)) {
      return this.state;
    }
    return {
      ...this.state,
      pieces: this.state.pieces.map(each => each.id === this.state.movingPiece!.id ? { ...each, position } : each),
      movingPiece: undefined
    };
  };

  cancelMove = () => {
    return {
      ...this.state,
      movingPiece: undefined
    }
  }
}
