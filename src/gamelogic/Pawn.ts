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
  addTakeablePositions = (positions: string[]) => {
    return this.takeablePositions().concat(positions)}
  movePositions = () => {
    return this.isFirstMove() ? [this.fwd().value(), this.fwd().fwd().value()] : [this.fwd().value()];
  };
  filterOutUndefined = (positions: (string | undefined)[]) => positions.filter(each => each)
  validMovePositions = (): string[] => {
    return pipe(
      this.filterInsideBoard,
      this.filterOutBlocked,
    this.filterOutUndefined,
      this.addTakeablePositions,
    )(this.movePositions());
  };

  takeablePositions() {
    const leftTake = this.up().left().value()
    const rightTake = this.up().right().value()
    return this.opponentPositions.reduce((total: string[], each) => {
      const takeablePositionIsOccupied = each === leftTake || each === rightTake;
      return takeablePositionIsOccupied ? total.concat(each) : total;
    }, []);
  }
}
