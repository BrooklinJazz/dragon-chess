import { cancelMove, initialGameState, initiateMove, movePiece } from "../game";
import { IGameState, Player } from "../types";
import { A2Pawn, A7Pawn, mockMove, C7Pawn, B2Pawn } from "../../constants/pieces";
import { selectMovingPiece, selectValidPositions, selectPiece, selectAllBlackPositions } from "../selectors";
import { configureMockStore } from "../configureMockStore";
import { C3, A3, B3, B4 } from "../../constants/positions";
import { Pawn } from "../../gamelogic/Pawn";
describe("taking a piece", () => {
  let store: any;
  beforeEach(() => {
    store = configureMockStore({ ...initialGameState, pieces: [] });
  });
  it("white player _ white turn _ B2Pawn _ A7Pawn on A3 _ C7Pawn on C3", () => {
    const mockState: IGameState = {
      ...initialGameState,
      pieces: [B2Pawn, mockMove(A7Pawn, A3), mockMove(C7Pawn, C3)],
      player: Player.white,
      turn: Player.white
    };
    store = configureMockStore(mockState);
    store.dispatch(initiateMove({ piece: B2Pawn }));
    expect(selectMovingPiece(store.getState())).toEqual(B2Pawn);
    expect(selectValidPositions(store.getState())).toEqual([A3, C3, B3, B4]);
    store.dispatch(movePiece({position: A3}));
    expect(selectAllBlackPositions(store.getState())).toEqual([C3])
  });
});
