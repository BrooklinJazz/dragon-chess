import { Piece } from "./Piece";
import { pipe } from "../helpers.ts/pipe";
import { C2, A3, D2, E3, F4, G5, H6 } from "../constants/positions";
import { Position } from "./Position";

export class Rook extends Piece {
  baseMovePositions= (): (string | undefined)[] => {
    const up = this.all(this.up);
    const left = this.all(this.left);
    const right = this.all(this.right);
    const down = this.all(this.down);
    return [...up, ...left, ...right, ...down];
  };

  movePositionsAfterUniqueFilters = (): string[] => pipe(
    this.filterOutUndefined,
  )(this.baseMovePositions())
}
