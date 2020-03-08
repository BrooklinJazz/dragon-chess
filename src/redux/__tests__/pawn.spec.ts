import { A7Pawn, B2Pawn, C7Pawn, mockMove } from '../../constants/pieces';
import { A3, B3, B4, C3 } from '../../constants/positions';
import { Fixture } from '../fixture';

describe("taking a piece", () => {
  let fixture: Fixture;
  beforeEach(() => {
    fixture = new Fixture()
  });
  it("white player _ white turn _ B2Pawn _ A7Pawn on A3 _ C7Pawn on C3", () => {
    fixture
      .addPieces(B2Pawn, mockMove(A7Pawn, A3), mockMove(C7Pawn, C3))
      .initiateMove(B2Pawn)
      .assertMovingPieceMatch(B2Pawn)
      .assertValidPositionsMatch(A3, C3, B3, B4)
      .movePiece(A3)
      .assertBlackPositionsMatch(C3)
  });
});
