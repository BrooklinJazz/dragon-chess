import { createGame, IGameState } from "./game";
import { configureStore } from "@reduxjs/toolkit";
export const configureMockStore = (mockState?: IGameState) => configureStore({
  reducer: {
    game: createGame(mockState).reducer
  }
});
