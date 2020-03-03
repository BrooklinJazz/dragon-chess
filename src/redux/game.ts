import { createSlice } from "@reduxjs/toolkit";
import { BlackPieces, WhitePieces, IPiece } from "../constants/pieces";
import { Game } from "../gamelogic/Game";

interface IPayload<T> {
  payload: T;
}

// TODO replace "white" and "black" to use this type
export type Player = "black" | "white"

export interface IGameState {
  pieces: IPiece[];
  movingPiece?: IPiece;
  player: Player,
  turn: Player
}

export const initialGameState: IGameState = {
  pieces: [...BlackPieces, ...WhitePieces],
  movingPiece: undefined,
  player: "white",
  turn: "white"
};

export const createGame = (mockState?: IGameState) =>
  createSlice({
    name: "game",
    initialState: mockState || (initialGameState as IGameState),
    reducers: {
      initiateMove: (state, { payload }: IPayload<{ piece: IPiece }>) =>
        new Game(state).initiateMove(payload),
      movePiece: (state, { payload }: IPayload<{ position: string }>) =>
        new Game(state).movePiece(payload),
      cancelMove: (state) =>
        new Game(state).cancelMove()
    }
  });

// Extract the action creators object and the reducer
const { actions, reducer } = createGame();

// Extract and export each action creator by name
export const { initiateMove, movePiece, cancelMove } = actions;
// Export the reducer, either as a default or named export
export const game = reducer;
