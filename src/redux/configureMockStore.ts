import { createGame } from "./game";
import { IGameState } from "./types";
import { configureStore } from "@reduxjs/toolkit";
export const configureMockStore = (mockState?: IGameState) => configureStore({
  reducer: {
    game: createGame(mockState).reducer
  }
});
