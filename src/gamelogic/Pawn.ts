import { Piece } from "./Piece";
export class Pawn extends Piece {
  isFirstMove = () => {
    // this is naive
    return this.initialPosition === this.piece.position;
  };
  filterOutBlocked = (positions: string[]) => {
    const [move1, move2] = positions;
    if (move1 && this.allTakenPositions.includes(move1)) {
      return [];
    }
    else if (move1 && move2 && this.allTakenPositions.includes(move2)) {
      return [move1];
    }
    return positions;
  };
  movePositions = () => {
    return this.isFirstMove() ? this.getForwardPositions(2) : this.getForwardPositions(1);
  };
}
