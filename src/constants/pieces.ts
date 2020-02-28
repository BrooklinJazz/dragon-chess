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

export const A7Pawn: IPiece = {
    id: "black-pawn-0",
    type: Pieces.pawn,
    player: "black",
    position: "a7"
}
export const A2Pawn: IPiece = {
    id: "white-pawn-0",
    type: Pieces.pawn,
    player: "white",
    position: "a2"
}

const BlackRow7: IPiece[] = row7.map((position, index) => ({player: "black", type: pawn, position, id: `black-${pawn}-${index}`}))
const BlackRow8: IPiece[] = row8.map((position, index) => {
    const type = pieceRow[index];
    return ({player: "black", type, position, id: `black-${type}-${index}`})
})

export const BlackPieces: IPiece[] = [...BlackRow7, ...BlackRow8]

const WhiteRow2: IPiece[] = row2.map((position, index) => ({player: "white", type: pawn, position, id: `white-${pawn}-${index}`}))
const WhiteRow1: IPiece[] = row1.map((position, index) => {
    const type = pieceRow[pieceRow.length - 1 - index];
    return ({player: "white", type, position, id: `white-${type}-${index}`})
})

export const WhitePieces: IPiece[] = [...WhiteRow2, ...WhiteRow1]