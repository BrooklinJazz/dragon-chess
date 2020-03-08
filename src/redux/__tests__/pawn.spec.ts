import { cancelMove, initialGameState, initiateMove, movePiece } from "../game";
import { IGameState, Player } from "../types";
import { A2Pawn, A7Pawn, mockMove, C7Pawn, B2Pawn } from "../../constants/pieces";
import { selectMovingPiece, selectValidPositions, selectPiece, selectAllBlackPositions } from "../selectors";
import { configureMockStore } from "../configureMockStore";
import { C3, A3, B3, B4 } from "../../constants/positions";
import { Pawn } from "../../gamelogic/Pawn";
import { Fixture } from "../fixture";
describe("taking a piece", () => {
  let store: any;
  beforeEach(() => {
    store = configureMockStore({ ...initialGameState, pieces: [] });
  });
  it("white player _ white turn _ B2Pawn _ A7Pawn on A3 _ C7Pawn on C3", () => {
    const fixture = new Fixture()
    fixture
      .addPieces(B2Pawn, mockMove(A7Pawn, A3), mockMove(C7Pawn, C3))
      .initiateMove(B2Pawn)
      .assertMovingPieceMatch(B2Pawn)
      .assertValidPositionsMatch(A3, C3, B3, B4)
      .movePiece(A3)
      .assertBlackPositionsMatch(C3)
  });
});
