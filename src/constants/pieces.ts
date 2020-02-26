export interface IPiece {
    name: string;
    player: "white" | "black";
    position: string;
    id: string;
}

export const Pawn: IPiece = {
    id: "placeholderId",
    name: "Pawn",
    player: "white",
    position: "a2"
}