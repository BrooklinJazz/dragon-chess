import { Piece } from "./Piece";
import { pipe } from "../helpers.ts/pipe";
import { A2 } from "../constants/positions";
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
  baseMovePositions= () => {
    return this.isFirstMove() ? [this.up().value(), this.up().up().value()] : [this.up().value()];
  };

  movePositionsAfterUniqueFilters(): string[] {
    return pipe(
      this.filterOutUndefined,
      this.filterOutBlocked,
      this.filterInsideBoard,
    )([...this.baseMovePositions(), ...this.takeablePositions()])
  }

  // validbaseMovePositions() {
  //   return pipe(
  //     this.filterInsideBoard,
  //     this.filterOutBlocked,
  //   this.filterOutUndefined,
  //     this.addTakeablePositions,
  //   )(this.baseMovePositions());
  // };

  takeablePositions() {
    const leftTake = this.up().left().value()
    const rightTake = this.up().right().value()
    return this.opponentPositions.reduce((total: string[], each) => {
      const takeablePositionIsOccupied = each === leftTake || each === rightTake;
      return takeablePositionIsOccupied ? total.concat(each) : total;
    }, []);
  }
}
