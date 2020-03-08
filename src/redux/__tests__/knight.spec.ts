import { A7Pawn, B2Pawn, C7Pawn, mockMove, B1Knight } from '../../constants/pieces';
import { A3, B3, B4, C3 } from '../../constants/positions';
import { Fixture } from '../fixture';

describe("knight", () => {
  let fixture: Fixture;
  beforeEach(() => {
    fixture = new Fixture()
  });
  it("white player _ white turn _ B1Knight", () => {
    fixture
      .addPieces(B1Knight)
      .initiateMove(B1Knight)
      .assertMovingPieceMatch(B1Knight)
      .assertValidPositionsMatch(A3, C3)
    //   .movePiece(A3)
    //   .assertBlackPositionsMatch(C3)
  });
});
