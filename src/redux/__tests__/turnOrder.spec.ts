import { configureMockStore } from "../configureMockStore";
import { initiateMove, movePiece, Player, initialGameState } from "../game";
import {
  selectMovingPiece,
  selectValidPositions,
  selectTurn
} from "../selectors";
import { A2Pawn, A7Pawn } from "../../constants/pieces";
import { A3, A6 } from "../../constants/positions";

describe("turn order", () => {
  let store: any;
  beforeEach(() => {
    store = configureMockStore({ ...initialGameState, player: Player.white });
  });
  it("initiateMove _ movePiece _ white turn _ white player", () => {
    store = configureMockStore({ ...initialGameState, player: Player.white, turn: Player.white });
    store.dispatch(initiateMove({ piece: A2Pawn }));
    store.dispatch(movePiece({ position: A3 }));
    expect(selectTurn(store.getState())).toEqual(Player.black);
  });
  it("initiateMove _ movePiece _ black turn _ black player", () => {
    store = configureMockStore({ ...initialGameState, player: Player.black, turn: Player.black });
    store.dispatch(initiateMove({ piece: A7Pawn }));
    store.dispatch(movePiece({ position: A6 }));
    expect(selectTurn(store.getState())).toEqual(Player.white);
  });
});
