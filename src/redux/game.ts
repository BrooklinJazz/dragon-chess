import { createSlice } from "@reduxjs/toolkit";
import { BlackPieces, WhitePieces } from "../constants/pieces";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    pieces: [...BlackPieces, ...WhitePieces]
  },
  reducers: {
    gameAction(state, action) {},
  }
});

// Extract the action creators object and the reducer
const { actions, reducer } = gameSlice;

// Extract and export each action creator by name
export const { gameAction } = actions;
// Export the reducer, either as a default or named export
export const game = reducer;
