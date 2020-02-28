import { row7, row8, row1, row2 } from "./positions"

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

export const createPiece = (player: "black" | "white", type: Pieces, position: string) => ({
    id: `${player}-${type}-${position}`,
    type,
    player,
    position
})

const BlackRow7: IPiece[] = row7.map((position) => createPiece("black", Pieces.pawn, position))
const BlackRow8: IPiece[] = row8.map((position, index) => {
    const type = pieceRow[index];
    return createPiece("black", type, position)
})

// TODO create all pieces when needed
export const [A7Pawn] = BlackRow7

export const BlackPieces: IPiece[] = [...BlackRow7, ...BlackRow8]

const WhiteRow2: IPiece[] = row2.map((position, index) => createPiece("white", Pieces.pawn, position))
const WhiteRow1: IPiece[] = row1.map((position, index) => {
    const type = pieceRow[pieceRow.length - 1 - index];
    return createPiece("white", type, position)
})

// TODO create all pieces when needed
export const [A2Pawn, B2Pawn] = WhiteRow2

export const mockMove = (piece: IPiece, position: string) => ({...piece, position})

export const WhitePieces: IPiece[] = [...WhiteRow2, ...WhiteRow1]