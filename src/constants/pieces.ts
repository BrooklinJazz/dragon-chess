import { row7, row8 } from "./positions"

export enum Pieces {
    pawn = "pawn",
    rook = "rook",
    knight = "knight",
    bishop = "bishop",
    queen = "queen",
    king = "king",
}

export const {rook, knight, pawn, bishop, queen, king} = Pieces

const pieceRow = [rook, knight, bishop, queen, king, bishop, knight, rook]

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

const BlackRow7: IPiece[] = row7.map((position, index) => ({player: "black", type: pawn, position, id: `black-${pawn}${index}`}))
const BlackRow8: IPiece[] = row8.map((position, index) => {
    const type = pieceRow[index];
    return ({player: "black", type, position, id: `black-${type}${index}`})
})

export const BlackPieces: IPiece[] = [...BlackRow7, ...BlackRow8]