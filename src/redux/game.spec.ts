import { game, initiateMove } from "./game";
import configureMockStore from "redux-mock-store";
import { A2Pawn, mockMove } from "../constants/pieces";
import { selectMovingPiece, selectValidPositions } from "./selectors";
import { AppState } from "../store";
import { configureStore } from "@reduxjs/toolkit";
import { A1, A3, A4, A8 } from "../constants/positions";

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

  it("initiateMove _ A2 Pawn _ in A3 position", () => {
    const A3Pawn = mockMove(A2Pawn, A3);
    store.dispatch(initiateMove({ piece: A3Pawn }));
    expect(selectMovingPiece(store.getState())).toEqual(A3Pawn);
    expect(selectValidPositions(store.getState())).toEqual([A4]);
  });
  // this would never happen, but it tests trying to move outside board.
  it("initiateMove _ A2 Pawn _ in A8 position", () => {
    const A8Pawn = mockMove(A2Pawn, A8);
    store.dispatch(initiateMove({ piece: A8Pawn }));
    expect(selectMovingPiece(store.getState())).toEqual(A8Pawn);
    expect(selectValidPositions(store.getState())).toEqual([]);
  });
});
