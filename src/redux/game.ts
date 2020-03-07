import { createSlice } from "@reduxjs/toolkit";
import { BlackPieces, WhitePieces, IPiece } from "../constants/pieces";
import { Game } from "../gamelogic/Game";
import { Player, IPayload } from "./types";
import { IGameState } from "./types";

export const initialGameState: IGameState = {
  pieces: [...BlackPieces, ...WhitePieces],
  movingPiece: undefined,
  player: Player.white,
  turn: Player.white
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
      cancelMove: state => new Game(state).cancelMove()
    }
  });

// Extract the action creators object and the reducer
const { actions, reducer } = createGame();

// Extract and export each action creator by name
export const { initiateMove, movePiece, cancelMove } = actions;
// Export the reducer, either as a default or named export
export const game = reducer;
