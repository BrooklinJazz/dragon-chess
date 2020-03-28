import {
  mockMove,
  B1Knight,
  C1Bishop,
  A7Pawn,
  A2Pawn,
  A1Rook,
  D7Pawn,
  E1Queen,
  D1King,
  H1Rook,
  E1King,
  F1Bishop,
  A8Rook,
  E8King,
  C8Bishop,
  H8Rook,
  F8Bishop
} from "../../constants/pieces";
// prettier-ignore
import { A3, D2, C2, H6, G5, F4, E3, G6, H5, G1, F2, D4, C5, B6, A7, C1, B2, A2, A4, A5, A6, B1, D1, E1, F1, H1, A8, E4, H4, G4, D7, D6, D5, D3, D8, B4, C4, H2, G2, E5, E6, E7, E8, F3, B5, E2, C3, G3, C8, G8, F8
} from "../../constants/positions";
import { Fixture } from "../../redux/fixture";
import { Player } from "../../redux/types";

describe("king", () => {
  let fixture: Fixture;
  beforeEach(() => {
    fixture = new Fixture();
  });
  it("white player _ white turn _ D1King", () => {
    fixture
      .addPieces(D1King)
      .initiateMove(D1King)
      .assertMovingPieceMatch(D1King)
      .assertValidPositionsMatch(C1, E1, C2, E2, D2) // can not castle because there are no rooks
      .movePiece(C1)
      .assertMovingPieceMatch(undefined)
      .assertPiecesContain(mockMove(D1King, C1));
  });
  it("white player _ white turn _ D1King on D2 _ A2Pawn on C2 _ A7Pawn on E2", () => {
    const D2King = mockMove(D1King, D2);
    const C2Pawn = mockMove(A2Pawn, C2);
    const E2Pawn = mockMove(A7Pawn, E2);
    fixture
      .addPieces(D2King, C2Pawn, E2Pawn)
      .initiateMove(D2King)
      .assertMovingPieceMatch(D2King)
      .assertValidPositionsMatch(C1, E1, E2, C3, E3, D3)
      .movePiece(E2)
      .assertMovingPieceMatch(undefined)
      .assertPiecesContain(mockMove(D2King, E2))
      .assertPiecesDoesNotContain(E2Pawn);
  });
  it("white player _ white turn _ D1King _ A7Pawn on C3 _ D2 is losing move", () => {
    const C3Pawn = mockMove(A7Pawn, C3);
    fixture
      .addPieces(D1King, C3Pawn)
      .initiateMove(D1King)
      .assertMovingPieceMatch(D1King)
      .assertIsNotValidPosition(D2);
  });
  it("white player _ white turn _ D1King _ A7Pawn on C3 _ D2 is losing move", () => {
    const C3Pawn = mockMove(A7Pawn, C3);
    fixture
      .addPieces(D1King, C3Pawn)
      .initiateMove(D1King)
      .assertMovingPieceMatch(D1King)
      .assertIsNotValidPosition(D2);
  });

  it("white player _ white turn _ D1King _ H1Rook _ Castling", () => {
    fixture
      .addPieces(E1King, H1Rook)
      .initiateMove(E1King)
      .assertPositionsIsValid(G1)
      .movePiece(G1)
      .assertPiecesMatch(mockMove(E1King, G1), mockMove(H1Rook, F1));
  });
  it("white player _ white turn _ E1King _ H1Rook _ Castling", () => {
    fixture
      .addPieces(E1King, H1Rook)
      .initiateMove(E1King)
      .assertPositionsIsValid(G1)
      .movePiece(G1)
      .assertPiecesMatch(mockMove(E1King, G1), mockMove(H1Rook, F1));
  });
  it("white player _ white turn _ E1King _ A1Rook _ Castling", () => {
    fixture
      .addPieces(E1King, A1Rook)
      .initiateMove(E1King)
      .assertPositionsIsValid(C1)
      .movePiece(C1)
      .assertPiecesMatch(mockMove(E1King, C1), mockMove(A1Rook, D1));
  });
  it("white player _ white turn _ E1King _ C1Bishop _ A1Rook _ INVALID Castling", () => {
    fixture
      .addPieces(E1King, A1Rook, C1Bishop)
      .initiateMove(E1King)
      .assertIsNotValidPosition(C1);
  });
  it("white player _ white turn _ E1King _ F1Bishop _ H1Rook _ INVALID Castling", () => {
    fixture
      .addPieces(E1King, H1Rook, F1Bishop)
      .initiateMove(E1King)
      .assertIsNotValidPosition(G1);
  });
  it("black player _ black turn _ E8King _ A8Rook _ CASTLING", () => {
    fixture = new Fixture(Player.black);
    fixture
      .addPieces(E8King, A8Rook)
      .initiateMove(E8King)
      .assertPositionsIsValid(C8)
      .movePiece(C8)
      .assertPiecesMatch(mockMove(E8King, C8), mockMove(A8Rook, D8));
  });
  it("black player _ black turn _ E8King _ C8Bishop _ A8Rook _ INVALID Castling", () => {
    fixture = new Fixture(Player.black);
    fixture
      .addPieces(E8King, A8Rook, C8Bishop)
      .initiateMove(E1King)
      .assertIsNotValidPosition(C8);
  });

  it("black player _ black turn _ E8King _ H8Rook _ Castling", () => {
    fixture = new Fixture(Player.black);
    fixture
      .addPieces(E8King, H8Rook)
      .initiateMove(E8King)
      .assertPositionsIsValid(G8)
      .movePiece(G8)
      .assertPiecesMatch(mockMove(E8King, G8), mockMove(H8Rook, F8));
  });

  it("black player _ black turn _ E8King _ F8Bishop _ H8Rook _ INVALID Castling", () => {
    fixture
      .addPieces(E8King, H8Rook, F8Bishop)
      .initiateMove(E8King)
      .assertIsNotValidPosition(G8);
  });

});
