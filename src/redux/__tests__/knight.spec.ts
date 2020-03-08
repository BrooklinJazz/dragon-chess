import { initialGameState, initiateMove } from "../game";
import { IGameState, Player } from "../types";
import { B1Knight } from "../../constants/pieces";
import { configureMockStore } from "../configureMockStore";
import { selectMovingPiece } from "../selectors";

describe("taking a piece", () => {
  let store: any;
  beforeEach(() => {
    store = configureMockStore({ ...initialGameState, pieces: [] });
  });
  it("white player _ white turn _ B2Pawn _ A7Pawn on A3 _ C7Pawn on C3", () => {
    const mockState: IGameState = {
      ...initialGameState,
      pieces: [B1Knight],
      player: Player.white,
      turn: Player.white
    };
    store = configureMockStore(mockState);
    store.dispatch(initiateMove({ piece: B1Knight }));
    expect(selectMovingPiece(store.getState())).toEqual(B1Knight)
  });
});
