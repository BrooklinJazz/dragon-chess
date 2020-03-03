import { game, initiateMove, movePiece, cancelMove, IGameState, initialGameState } from "./game";
import { A2Pawn, mockMove, A7Pawn } from "../constants/pieces";
import { selectMovingPiece, selectValidPositions, selectPiece, selectPlayer } from "./selectors";
import { AppState } from "../store";
import { A1, A3, A4, A8, A6, A5 } from "../constants/positions";
import { configureMockStore } from "./configureMockStore";

describe("initiateMove", () => {
  let store: any;
  beforeEach(() => {
    store = configureMockStore();
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
  it("initiateMove _ A2 Pawn in A8 position", () => {
    const A8Pawn = mockMove(A2Pawn, A8);
    store.dispatch(initiateMove({ piece: A8Pawn }));
    expect(selectMovingPiece(store.getState())).toEqual(A8Pawn);
    expect(selectValidPositions(store.getState())).toEqual([]);
  });
  it("initiateMove _ A2 Pawn _ A7Pawn in A3 Position", () => {
    const A3Pawn = mockMove(A7Pawn, A3);
    const mockState: IGameState = {
      ...initialGameState,
      pieces: [A2Pawn, A3Pawn],
      movingPiece: A2Pawn,
    };
    store = configureMockStore(mockState);

    expect(selectValidPositions(store.getState())).toEqual([]);
  });

  it("initiateMove _ A2 Pawn _ A7Pawn in A4 Position", () => {
    const A4Pawn = mockMove(A7Pawn, A4);
    const mockState: IGameState = {
      ...initialGameState,
      pieces: [A2Pawn, A4Pawn],
      movingPiece: A2Pawn,
    };
    store = configureMockStore(mockState);
    expect(selectValidPositions(store.getState())).toEqual([A3]);
  });
  it("initiateMove _ black turn _ white player _ A7 Pawn", () => {
    const mockState: IGameState = {
      ...initialGameState,
      pieces: [A2Pawn],
      movingPiece: undefined,
      player: "white",
      turn: "black"
    };
    store = configureMockStore(mockState)
    store.dispatch(initiateMove({ piece: A2Pawn }));
    expect(selectMovingPiece(store.getState())).toBeUndefined();
  });

  it("initiateMove _ A7 Pawn _ black player _ black turn", () => {
    const mockState: IGameState = {
      ...initialGameState,
      pieces: [A2Pawn],
      movingPiece: undefined,
      player: "black",
      turn: "black"
    };
    store.dispatch(initiateMove({ piece: A7Pawn }));
    expect(selectMovingPiece(store.getState())).toEqual(A7Pawn);
    expect(selectValidPositions(store.getState())).toEqual([A6, A5]);
  });
  it("initiateMove _ A7 Pawn _ black player _ white turn", () => {
    const mockState: IGameState = {
      ...initialGameState,
      pieces: [A7Pawn],
      movingPiece: undefined,
      player: "black",
      turn: "white"
    };
    store = configureMockStore(mockState)
    store.dispatch(initiateMove({ piece: A7Pawn }));
    expect(selectMovingPiece(store.getState())).toBeUndefined();
  });
});

describe("movePiece", () => {
  let store: any;
  beforeEach(() => {
    store = configureMockStore({ ...initialGameState, pieces: []});
  });

  it("movePiece _ A2 Pawn _ A7Pawn in A4 Position", () => {
    const mockState: IGameState = {
      ...initialGameState,
      pieces: [A2Pawn],
      movingPiece: A2Pawn,
    };
    store = configureMockStore(mockState);
    store.dispatch(movePiece({ position: A3 }));
    expect(selectPiece(store.getState(), A3)).toEqual({...A2Pawn, position: A3})
    expect(selectMovingPiece(store.getState())).toBeUndefined()
  });

  it("movePiece _ black turn _ white player _ A7 Pawn", () => {
    const mockState: IGameState = {
      ...initialGameState,
      pieces: [A7Pawn],
      movingPiece: A7Pawn,
      player: "white",
      turn: "black"
    };
    store = configureMockStore(mockState)
    store.dispatch(movePiece({ position: A6 }));
    expect(selectMovingPiece(store.getState())).toEqual(A7Pawn);
  });
});



describe("cancelMove", () => {
  let store: any;
  beforeEach(() => {
    store = configureMockStore({ ...initialGameState, pieces: [],  });
  });

  it("cancelMove _ with movingPiece", () => {
    const mockState: IGameState = {
      ...initialGameState,
      pieces: [A2Pawn],
      movingPiece: A2Pawn,
      player: "white",
      turn: "white"
    };
    store = configureMockStore(mockState);
    store.dispatch(cancelMove());
    expect(selectMovingPiece(store.getState())).toBeUndefined()
  });

  it("cancelMove _ with movingPiece _ white player _ black turn", () => {
    const mockState: IGameState = {
      ...initialGameState,
      pieces: [A7Pawn],
      movingPiece: A7Pawn,
      player: "white",
      turn: "black"
    };
    store = configureMockStore(mockState);
    store.dispatch(cancelMove());
    expect(selectMovingPiece(store.getState())).toEqual(A7Pawn)
  });


});
