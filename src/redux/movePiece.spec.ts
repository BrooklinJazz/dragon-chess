import { movePiece, IGameState, initialGameState } from "./game";
import { A2Pawn, A7Pawn } from "../constants/pieces";
import { selectMovingPiece, selectPiece } from "./selectors";
import { A3, A6 } from "../constants/positions";
import { configureMockStore } from "./configureMockStore";
describe("movePiece", () => {
  let store: any;
  beforeEach(() => {
    store = configureMockStore({ ...initialGameState, pieces: [] });
  });
  it("movePiece _ A2 Pawn _ A7Pawn in A4 Position", () => {
    const mockState: IGameState = {
      ...initialGameState,
      pieces: [A2Pawn],
      movingPiece: A2Pawn,
    };
    store = configureMockStore(mockState);
    store.dispatch(movePiece({ position: A3 }));
    expect(selectPiece(store.getState(), A3)).toEqual({ ...A2Pawn, position: A3 });
    expect(selectMovingPiece(store.getState())).toBeUndefined();
  });
  it("movePiece _ black turn _ white player _ A7 Pawn", () => {
    const mockState: IGameState = {
      ...initialGameState,
      pieces: [A7Pawn],
      movingPiece: A7Pawn,
      player: "white",
      turn: "black"
    };
    store = configureMockStore(mockState);
    store.dispatch(movePiece({ position: A6 }));
    expect(selectMovingPiece(store.getState())).toEqual(A7Pawn);
  });
});
