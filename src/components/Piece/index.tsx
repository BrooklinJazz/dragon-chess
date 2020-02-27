import React from "react";
import styled from "styled-components";
import { IPiece, Pieces } from "../../constants/pieces";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import { faChessPawn, faChessRook, faChessKnight, faChessBishop, faChessQueen, faChessKing } from "@fortawesome/free-solid-svg-icons";

interface IPieceProps {
  piece: IPiece;
  height?: number;
}

const iconFromPiece = (piece: IPiece) => {
  switch (piece.type) {
    case Pieces.pawn:
      return faChessPawn;
    case Pieces.rook:
      return faChessRook;
    case Pieces.knight:
      return faChessKnight;
    case Pieces.bishop:
      return faChessBishop;
    case Pieces.queen:
      return faChessQueen;
    case Pieces.king:
      return faChessKing;
    default:
      throw new Error(`iconFromPiece called with invalid piece ${piece}`);
  }
};

const PieceIcon: any = styled(FontAwesomeIcon).attrs((props: IPieceProps) => ({
  icon: iconFromPiece(props.piece),
}))`
  font-size: ${(props: IPieceProps) => (props.height || 25) - 6}px;
`

export const Piece = ({ piece, ...restProps }: IPieceProps) => (
  <PieceIcon {...restProps} piece={piece}/>
);
