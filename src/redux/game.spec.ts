import { game, initiateMove } from "./game";
import configureMockStore from "redux-mock-store";
import { A2Pawn } from "../constants/pieces";
import { selectMovingPiece } from "./selectors";
import { AppState } from "../store";
import { configureStore } from "@reduxjs/toolkit";

describe("redux game", () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        game
      }
    });
  });
  it("initiateMove _ A2 Pawn", () => {
    store.dispatch(initiateMove({ piece: A2Pawn }));
    expect(selectMovingPiece(store.getState() as AppState)).toEqual(A2Pawn);
  });
});
