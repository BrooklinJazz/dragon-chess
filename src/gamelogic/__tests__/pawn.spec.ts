import { A7Pawn, B2Pawn, C7Pawn, mockMove, A8Rook, A2Pawn, D1King } from '../../constants/pieces';
import { A3, B3, B4, C3, D2, D3, F1, E3 } from '../../constants/positions';
import { Fixture } from '../../redux/fixture';

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
  it("white player _ white turn _ D1King _ A2Pawn on D2 _ A8Rook on E3 _ A8Rook on F1", () => {
    const D2Pawn = mockMove(A2Pawn, D2)
    const E3Rook = mockMove(A8Rook, E3)
    const F1Rook = mockMove(A8Rook, F1)
    fixture
      .addPieces(D1King, D2Pawn, E3Rook, F1Rook)
      .initiateMove(D2Pawn)
      .assertMovingPieceMatch(D2Pawn)
      .assertNoValidPositions()
  });
});
