import { game, initiateMove, movePiece } from "./game";
import { A2Pawn, mockMove, A7Pawn } from "../constants/pieces";
import { selectMovingPiece, selectValidPositions, selectPiece } from "./selectors";
import { AppState } from "../store";
import { A1, A3, A4, A8 } from "../constants/positions";
import { configureMockStore } from "./configureMockStore";

describe("initiateMove", () => {
  let store: any;
  beforeEach(() => {
    store = configureMockStore({ pieces: [] });
  });

  it.only("initiateMove _ A2 Pawn", () => {
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
  it("initiateMove _ A2 Pawn in A8 position", () => {
    const A8Pawn = mockMove(A2Pawn, A8);
    store.dispatch(initiateMove({ piece: A8Pawn }));
    expect(selectMovingPiece(store.getState())).toEqual(A8Pawn);
    expect(selectValidPositions(store.getState())).toEqual([]);
  });
  it("initiateMove _ A2 Pawn _ A7Pawn in A3 Position", () => {
    const A3Pawn = mockMove(A7Pawn, A3);
    const mockState = {
      pieces: [A2Pawn, A3Pawn],
      movingPiece: A2Pawn
    };
    store = configureMockStore(mockState);

    expect(selectValidPositions(store.getState())).toEqual([]);
  });

  it("initiateMove _ A2 Pawn _ A7Pawn in A4 Position", () => {
    const A4Pawn = mockMove(A7Pawn, A4);
    const mockState = {
      pieces: [A2Pawn, A4Pawn],
      movingPiece: A2Pawn
    };
    store = configureMockStore(mockState);
    expect(selectValidPositions(store.getState())).toEqual([A3]);
  });
});

describe("movePiece game", () => {
  let store: any;
  beforeEach(() => {
    store = configureMockStore({ pieces: [] });
  });

  it("movePiece _ A2 Pawn _ A7Pawn in A4 Position", () => {
    const mockState = {
      pieces: [A2Pawn],
      movingPiece: A2Pawn
    };
    store = configureMockStore(mockState);
    store.dispatch(movePiece({ position: A3 }));
    expect(selectPiece(store.getState(), A3)).toEqual({...A2Pawn, position: A3})
  });
});
