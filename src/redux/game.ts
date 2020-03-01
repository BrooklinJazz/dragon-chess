import { createSlice } from "@reduxjs/toolkit";
import { BlackPieces, WhitePieces, IPiece } from "../constants/pieces";
import { selectValidPositions } from "./selectors";

interface IPayload<T> {
  payload: T;
}

export interface IGameState {
  pieces: IPiece[];
  movingPiece?: IPiece;
}

export const initialGameState = {
  pieces: [...BlackPieces, ...WhitePieces],
  movingPiece: undefined
};

export const createGame = (mockState?: IGameState) =>
  createSlice({
    name: "game",
    initialState: mockState || (initialGameState as IGameState),
    reducers: {
      initiateMove: (
        state,
        { payload: { piece } }: IPayload<{ piece: IPiece }>
      ) => {
        return {
          ...state,
          movingPiece: piece
        };
      },
      movePiece: (
        state,
        { payload: { position } }: IPayload<{ position: string }>
      ) => {
        const validPositions = selectValidPositions({ game: state });
        if (
          !state.movingPiece ||
          !validPositions.some(each => each === position)
        ) {
          return state;
        }
        return {
          ...state,
          pieces: state.pieces.map(each =>
            each.id === state.movingPiece!.id ? { ...each, position } : each
          ),
          movingPiece: undefined
        };
      }
    }
  });

// Extract the action creators object and the reducer
const { actions, reducer } = createGame();

// Extract and export each action creator by name
export const { initiateMove, movePiece } = actions;
// Export the reducer, either as a default or named export
export const game = reducer;
