import { Piece } from "./Piece";
import { pipe } from "../helpers.ts/pipe";
import { PieceFactory } from "./PieceFactory";
import { Player } from "../redux/types";

export class King extends Piece {
  movePositions = (): (string | undefined)[] => {
    return [
      this.up().value(),
      this.left().value(),
      this.right().value(),
      this.down().value(),
      this.upRight().value(),
      this.upLeft().value(),
      this.downRight().value(),
      this.downLeft().value()
    ];
  };

  // TODO REFACTOR this garbo
  possibleOpponentMoves = () =>
    this.movePositions().reduce((moves: string[], move) => {
      if (!move) {
        return moves
      }
      const newPiece = {
        ...this.piece,
        position: move
      };
      const friendlyPieces = this.friendlyPieces.map(each =>
        each.id === newPiece.id ? newPiece : each
      );
      const whitePieces =
        this.player() === Player.white ? friendlyPieces : this.opponentPieces;
      const blackPieces =
        this.player() === Player.black ? friendlyPieces : this.opponentPieces;
      const whitePositions = whitePieces.map(each => each.position);
      const blackPositions = blackPieces.map(each => each.position);
      const opponentMovesAfterKingMove = this.opponentPieces.reduce(
        (total: string[], opponentPiece) => {
          return [
            ...total,
            ...PieceFactory.fromPiece(
              opponentPiece,
              whitePositions,
              blackPositions,
              whitePieces,
              blackPieces
            ).takeablePositions()
          ];
        },
        []
      );
      return [...moves, ...opponentMovesAfterKingMove]
    }, []);

  filterOutLosingPositions = (positions: string[]) => {
    const opponentMoves = this.possibleOpponentMoves();
    return positions.filter(
      position => !opponentMoves.some(each => position === each)
    );
  };

  validMovePositions = (): string[] =>
    pipe(
      this.filterOutUndefined,
      this.filterOutFriendlyPositions,
      this.filterOutLosingPositions
    )(this.movePositions());
}
