import { AppState } from "../store";

export const selectPieces = (state: AppState) => state.game.pieces
export const selectPiece = (state: AppState, position: string) => state.game.pieces.find(piece => piece.position === position)