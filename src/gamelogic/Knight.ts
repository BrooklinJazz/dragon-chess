import { Piece } from "./Piece";
import { pipe } from "../helpers.ts/pipe";
import { A3, C3 } from "../constants/positions";
export class Knight extends Piece {

  validMovePositions = (): string[] => [A3, C3]
}
