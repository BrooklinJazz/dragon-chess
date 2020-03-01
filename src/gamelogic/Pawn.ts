import { Piece } from "./Piece";
import { pipe } from "../helpers.ts/pipe";
export class Pawn extends Piece {
  isFirstMove = () => {
    return this.position.value() === this.piece.initialPosition;
  };
  // TODO: make filterOutBlocked cleaner
  filterOutBlocked = (positions: string[]) => {
    const [move1, move2] = positions;
    if (move1 && this.allTakenPositions.includes(move1)) {
      return [];
    }
    else if (move1 && move2 && this.allTakenPositions.includes(move2)) {
      return [move1];
    }
    else if (move1 === this.position.value()) {
      return []
    }
    return positions;
  };
  player = () => this.piece.player
  up = () => this.position.up()
  down = () => this.position.down()
  fwd = () => this.position.fwd()
  movePositions = (): string[] => {
    return this.isFirstMove() ? [this.fwd().value(), this.fwd().fwd().value()] : [this.fwd().value()];
  };
  validMovePositions = (): string[] => {
    return pipe(
      this.filterInsideBoard,
      this.filterOutBlocked
    )(this.movePositions());
  };
}
