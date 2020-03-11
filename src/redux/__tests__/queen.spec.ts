import { mockMove, B1Knight, C1Bishop, A7Pawn, A2Pawn, A1Rook, D7Pawn, E1Queen, A8Rook, D1King } from '../../constants/pieces';
import { A3, D2, C2, H6, G5, F4, E3, G6, H5, G1, F2, D4, C5, B6, A7, C1, B2, A2, A4, A5, A6, B1, D1, E1, F1, H1, A8, E4, H4, G4, D7, D6, D5, D3, D8, B4, C4, H2, G2, E5, E6, E7, E8, F3, B5, E2, C3, G3 } from '../../constants/positions';
import { Fixture } from '../fixture';

describe("knight", () => {
  let fixture: Fixture;
  beforeEach(() => {
    fixture = new Fixture()
  });
  it("white player _ white turn _ E1Queen on E2", () => {
      const E2Queen = mockMove(E1Queen, E2)
    fixture
      .addPieces(E2Queen)
      .initiateMove(E2Queen)
      .assertMovingPieceMatch(E2Queen)
      .assertValidPositionsMatch(E1, E3, E4, E5, E6, E7, E8, A2, B2, C2, D2, F2, G2, H2, D1, F3, G4, H5, F1, D3, C4, B5, A6)
      .movePiece(A2)
      .assertMovingPieceMatch(undefined)
      .assertPiecesContain(mockMove(E2Queen, A2))
  });
  it("white player _ white turn _ E1Queen _ A2Pawn on C3 _ A7Pawn on F3 _ Blocking Pawns on F1 and D1 and E2", () => {
    const C3Pawn = mockMove(A2Pawn, C3)
    const F1Pawn = mockMove(A2Pawn, F1)
    const D1Pawn = mockMove(A2Pawn, D1)
    const E2Pawn = mockMove(A2Pawn, E2)
    const G3Pawn = mockMove(A7Pawn, G3)
    fixture
      .addPieces(E1Queen, C3Pawn, G3Pawn, F1Pawn, D1Pawn, E2Pawn)
      .initiateMove(E1Queen)
      .assertMovingPieceMatch(E1Queen)
      .assertValidPositionsMatch(D2, F2, G3)
      .movePiece(G3)
      .assertMovingPieceMatch(undefined)
      .assertPiecesContain(mockMove(E1Queen, G3))
      .assertPiecesDoesNotContain(G3Pawn)
  });

  it("white player _ white turn _ D1King _ E1Queen on D2 _ A8Rook on D3 _ A8Rook on F1", () => {
    const D2Queen = mockMove(E1Queen, D2)
    const D3Rook = mockMove(A8Rook, D3)
    const F1Rook = mockMove(A8Rook, F1)
    fixture
      .addPieces(D1King, D2Queen, D3Rook, F1Rook)
      .initiateMove(D2Queen)
      .assertMovingPieceMatch(D2Queen)
      .assertNoValidPositions()
  });
});
