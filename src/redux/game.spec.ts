import { game, initiateMove } from "./game";
import configureMockStore from "redux-mock-store";
import { A2Pawn, mockMove } from "../constants/pieces";
import { selectMovingPiece, selectValidPositions } from "./selectors";
import { AppState } from "../store";
import { configureStore } from "@reduxjs/toolkit";
import { A1, A3, A4 } from "../constants/positions";

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
    expect(selectMovingPiece(store.getState())).toEqual(A2Pawn);
    expect(selectValidPositions(store.getState())).toEqual([A3, A4]);
  });

  it("initiateMove _ A3 Pawn", () => {
    const A3Pawn = mockMove(A2Pawn, A3);
    store.dispatch(initiateMove({ piece: A3Pawn }));
    expect(selectMovingPiece(store.getState())).toEqual(A3Pawn);
    expect(selectValidPositions(store.getState())).toEqual([A4]);
  });
});
