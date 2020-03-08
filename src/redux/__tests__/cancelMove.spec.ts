import { cancelMove, initialGameState } from "../game";
import { IGameState, Player } from "../types";
import { A2Pawn, A7Pawn } from "../../constants/pieces";
import { selectMovingPiece } from "../selectors";
import { configureMockStore } from "../configureMockStore";
describe("cancelMove", () => {
  let store: any;
  beforeEach(() => {
    store = configureMockStore({ ...initialGameState, pieces: [], });
  });
  it("cancelMove _ with movingPiece", () => {
    const mockState: IGameState = {
      ...initialGameState,
      pieces: [A2Pawn],
      movingPiece: A2Pawn,
      player: Player.white,
      turn: Player.white
    };
    store = configureMockStore(mockState);
    store.dispatch(cancelMove());
    expect(selectMovingPiece(store.getState())).toBeUndefined();
  });
  it("cancelMove _ with movingPiece _ white player _ black turn", () => {
    const mockState: IGameState = {
      ...initialGameState,
      pieces: [A7Pawn],
      movingPiece: A7Pawn,
      player: Player.white,
      turn: Player.black
    };
    store = configureMockStore(mockState);
    store.dispatch(cancelMove());
    expect(selectMovingPiece(store.getState())).toEqual(A7Pawn);
  });
});
