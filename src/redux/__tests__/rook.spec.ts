import { mockMove, B1Knight, C1Bishop, A7Pawn, A2Pawn, A1Rook, D7Pawn } from '../../constants/pieces';
import { A3, D2, C2, H6, G5, F4, E3, G6, H5, G1, F2, D4, C5, B6, A7, C1, B2, A2, A4, A5, A6, B1, D1, E1, F1, H1, A8, E4, H4, G4, D7, D6, D5, D3, D8, B4, C4 } from '../../constants/positions';
import { Fixture } from '../fixture';

describe("knight", () => {
  let fixture: Fixture;
  beforeEach(() => {
    fixture = new Fixture()
  });
  it("white player _ white turn _ A1Rook", () => {
    fixture
      .addPieces(A1Rook)
      .initiateMove(A1Rook)
      .assertMovingPieceMatch(A1Rook)
      .assertValidPositionsMatch(A2, A3, A4, A5, A6, A7, A8, B1, C1, D1, E1, F1, G1, H1)
      .movePiece(A3)
      .assertMovingPieceMatch(undefined)
      .assertPiecesContain(mockMove(A1Rook, A3))
  });
  it("white player _ white turn _ A1Rook on D4", () => {
    const D4Rook = mockMove(A1Rook, D4)
    fixture
      .addPieces(D4Rook)
      .initiateMove(D4Rook)
      .assertMovingPieceMatch(D4Rook)
      .assertValidPositionsMatch(A4, B4, C4, E4, F4, G4, H4, D1, D2, D3, D5, D6, D7, D8)
      .movePiece(A4)
      .assertMovingPieceMatch(undefined)
      .assertPiecesContain(mockMove(A1Rook, A4))
  });
  it("white player _ white turn _ A1Rook _ A2Pawn on A4 _ D7Pawn on D1", () => {
    const A4Pawn = mockMove(A2Pawn, A4)
    const D1Pawn = mockMove(D7Pawn, D1)
    fixture
      .addPieces(A1Rook, A4Pawn, D1Pawn)
      .initiateMove(A1Rook)
      .assertMovingPieceMatch(A1Rook)
      .assertValidPositionsMatch(A2, A3, B1, C1, D1)
      .movePiece(D1)
      .assertMovingPieceMatch(undefined)
      .assertPiecesContain(mockMove(A1Rook, D1))
      .assertPiecesDoesNotContain(D1Pawn)
  });
});
