import { createSlice } from "@reduxjs/toolkit";
import { BlackPieces, WhitePieces, IPiece } from "../constants/pieces";

interface IPayload<T> {
  payload: T
}

export interface IGameState {
  pieces: IPiece[]
  movingPiece?: IPiece;
}

export const initialGameState = {
  pieces: [...BlackPieces, ...WhitePieces],
  movingPiece: undefined
}

export const createGame =(mockState?: IGameState) => createSlice({
  name: "game",
  initialState: mockState || initialGameState  as IGameState,
  reducers: {
    initiateMove: (state, {payload}: IPayload<{piece: IPiece}>) =>  {
      return {
        ...state,
        movingPiece: payload.piece
      }
    },
  }
});

// Extract the action creators object and the reducer
const { actions, reducer } = createGame();

// Extract and export each action creator by name
export const { initiateMove } = actions;
// Export the reducer, either as a default or named export
export const game = reducer;
