import { IPiece } from "../constants/pieces";
export interface IGameState {
  pieces: IPiece[];
  movingPiece?: IPiece;
  player: Player;
  turn: Player;
}

export interface IPayload<T> {
  payload: T;
}

// TODO replace "white" and "black" to use this type
export enum Player {
  black = "black",
  white = "white"
}
