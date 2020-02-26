import React from "react";
import styled from "styled-components";
import { IPiece, Pieces } from "../../constants/pieces";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";
import { faChessPawn } from "@fortawesome/free-solid-svg-icons";

interface IPieceProps {
  piece: IPiece;
}

const iconFromPiece = (piece: IPiece) => {
  switch (piece.type) {
    case Pieces.pawn:
      return faChessPawn;
    default:
      throw new Error(`iconFromPiece called with invalid piece ${piece}`);
  }
};

const PieceIcon: any = styled(FontAwesomeIcon).attrs((props: IPieceProps) => ({
  icon: iconFromPiece(props.piece),
}))``

export const Piece = ({ piece, ...restProps }: IPieceProps) => (
  <PieceIcon {...restProps} piece={piece}/>
);
