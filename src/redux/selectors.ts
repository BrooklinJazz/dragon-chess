import { AppState } from "../store";
import { createSelector } from "reselect";
import { A1, A2, A3, A4 } from "../constants/positions";

export const selectPieces = (state: AppState) => state.game.pieces
export const selectPiece = (state: AppState, position: string) => state.game.pieces.find(piece => piece.position === position)
export const selectMovingPiece = (state: AppState) => state.game.movingPiece

export const selectValidPositions = createSelector(
    selectPieces,
    selectMovingPiece,
    (pieces, movingPiece) => [A3, A4]
)