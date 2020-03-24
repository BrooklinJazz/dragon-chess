import { row7, row8, row1, row2 } from "./positions"
import { Player } from "../redux/types"

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
    player: Player;
    position: string;
    initialPosition: string;
    id: string;
    hasMoved: boolean;
}

export const createPiece = (player: Player, type: Pieces, position: string) => ({
    id: `${player}-${type}-${position}`,
    type,
    player,
    position,
    initialPosition: position,
    hasMoved: false
})

const BlackRow7: IPiece[] = row7.map((position) => createPiece(Player.black, Pieces.pawn, position))
const BlackRow8: IPiece[] = row8.map((position, index) => {
    const type = pieceRow[index];
    return createPiece(Player.black, type, position)
})

// TODO create all pieces when needed
export const [A7Pawn, B7Pawn, C7Pawn, D7Pawn] = BlackRow7
export const [A8Rook] = BlackRow8

export const BlackPieces: IPiece[] = [...BlackRow7, ...BlackRow8]

const WhiteRow2: IPiece[] = row2.map((position) => createPiece(Player.white, Pieces.pawn, position))
const WhiteRow1: IPiece[] = row1.map((position, index) => {
    const type = pieceRow[pieceRow.length - 1 - index];
    return createPiece(Player.white, type, position)
})

// TODO create all pieces when needed
export const [A2Pawn, B2Pawn] = WhiteRow2
export const [A1Rook, B1Knight, C1Bishop, D1King, E1Queen, F1Bishop, G1Knight, H1Rook] = WhiteRow1

export const mockMove = (piece: IPiece, position: string) => ({...piece, position, hasMoved: true})

export const WhitePieces: IPiece[] = [...WhiteRow2, ...WhiteRow1]