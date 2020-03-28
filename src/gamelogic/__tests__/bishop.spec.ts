import { mockMove, B1Knight, C1Bishop, A7Pawn, A2Pawn, A8Rook, D1King } from '../../constants/pieces';
import { A3, D2, C2, H6, G5, F4, E3, G6, H5, G1, F2, D4, C5, B6, A7, C1, B2, D3 } from '../../constants/positions';
import { Fixture } from '../../redux/fixture';

describe("knight", () => {
  let fixture: Fixture;
  beforeEach(() => {
    fixture = new Fixture()
  });
  it("white player _ white turn _ C1Bishop", () => {
    fixture
      .addPieces(C1Bishop)
      .initiateMove(C1Bishop)
      .assertMovingPieceMatch(C1Bishop)
      .assertValidPositionsMatch(B2, A3, D2, E3, F4, G5, H6)
      .movePiece(A3)
      .assertMovingPieceMatch(undefined)
      .assertPiecesContain(mockMove(C1Bishop, A3))
  });

  it("white player _ white turn _ C1Bishop on E3", () => {
    const E3Bishop = mockMove(C1Bishop, E3)
    fixture
      .addPieces(E3Bishop)
      .initiateMove(E3Bishop)
      .assertValidPositionsMatch(C1, D2, F4, G5, H6, G1, F2, D4, C5, B6, A7)
  });

  it("white player _ white turn _ C1Bishop _ A7Pawn on E2", () => {
    const E3Pawn = mockMove(A7Pawn, E3)
    const A3Pawn = mockMove(A2Pawn, A3)
    fixture
      .addPieces(C1Bishop, E3Pawn, A3Pawn)
      .initiateMove(C1Bishop)
      .assertValidPositionsMatch(D2, E3, B2)
  });
  it("white player _ white turn _ D1King _ C1Bishop on D2 _ A8Rook on D3", () => {
    const D1Bishop = mockMove(C1Bishop, D2)
    const D3Rook = mockMove(A8Rook, D3)
    fixture
      .addPieces(D1King, D1Bishop, D3Rook)
      .initiateMove(D1Bishop)
      .assertMovingPieceMatch(D1Bishop)
      .assertNoValidPositions()
  });
});
