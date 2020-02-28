import { createSlice } from "@reduxjs/toolkit";
import { BlackPieces, WhitePieces, IPiece } from "../constants/pieces";

interface IPayload<T> {
  payload: T
}

interface IGameState {
  pieces: IPiece[]
  movingPiece?: IPiece;
}

const gameSlice = createSlice({
  name: "game",
  initialState: {
    pieces: [...BlackPieces, ...WhitePieces],
    movingPiece: undefined
  } as IGameState,
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
const { actions, reducer } = gameSlice;

// Extract and export each action creator by name
export const { initiateMove } = actions;
// Export the reducer, either as a default or named export
export const game = reducer;
