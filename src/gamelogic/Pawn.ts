import { Piece } from "./Piece";
import { tsThisType } from "@babel/types";
import { pipe } from "../helpers.ts/pipe";
export class Pawn extends Piece {
  isFirstMove = () => {
    return this.position.position() === this.piece.initialPosition;
  };
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
  movePositions = (): string[] => {
    console.warn(this.position.value(), this.position.up().value())
    return this.isFirstMove() ? [this.position.up().value(), this.position.up().up().value()] : [this.position.up().value()];
  };
  validMovePositions = (): string[] => {
    return pipe(
      this.filterInsideBoard,
      this.filterOutBlocked
    )(this.movePositions());
  };
}
