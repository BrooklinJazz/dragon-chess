import { A7Pawn, mockMove, B1Knight, A2Pawn } from '../../constants/pieces';
import { A3, C3, A2, A4, B1, B5, D1, D5, E2, E4, D2 } from '../../constants/positions';
import { Fixture } from '../fixture';

describe("knight", () => {
  let fixture: Fixture;
  beforeEach(() => {
    fixture = new Fixture()
  });
  it("white player _ white turn _ B1Knight", () => {
    fixture
      .addPieces(B1Knight)
      .addPieces(B1Knight)
      .initiateMove(B1Knight)
      .assertMovingPieceMatch(B1Knight)
      .assertValidPositionsMatch(C3, A3, D2)
      .movePiece(A3)
      .assertMovingPieceMatch(undefined)
      .assertPiecesContain(mockMove(B1Knight, A3))
  });
  it("white player _ white turn _ B1Knight on C3 _ A7Pawn on A4 _ capture", () => {
    const C3Knight = mockMove(B1Knight, C3)
    const A4Pawn = mockMove(A7Pawn, A4)
    fixture
      .addPieces(C3Knight)
      .initiateMove(C3Knight)
      .assertValidPositionsMatch(A2, A4, B1, B5, D1, D5, E2, E4)
      .movePiece(A4)
      .assertMovingPieceMatch(undefined)
      .assertPiecesContain(mockMove(B1Knight, A4))
      .assertPiecesDoesNotContain(A4Pawn)
  });
  it("white player _ white turn _ B1Knight on C3 _ A2Pawn on A4", () => {
    const C3Knight = mockMove(B1Knight, C3)
    const A4Pawn = mockMove(A2Pawn, A4)
    fixture
      .addPieces(C3Knight)
      .addPieces(A4Pawn)
      .initiateMove(C3Knight)
      .assertValidPositionsMatch(A2, B1, B5, D1, D5, E2, E4)
      .movePiece(A4)
      .assertMovingPieceMatch(C3Knight)
      .assertPiecesContain(A4Pawn)
  });
});
