export enum Pieces {
    pawn,
    knight
}

export interface IPiece {
    type: Pieces;
    player: "white" | "black";
    position: string;
    id: string;
}

export const Pawn: IPiece = {
    id: "placeholderId",
    type: Pieces.pawn,
    player: "white",
    position: "a2"
}