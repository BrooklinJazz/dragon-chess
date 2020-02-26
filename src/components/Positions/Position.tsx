import React from "react";
import styled from "styled-components";
import { secondary, primary } from "../../theme/colors";
import { colorFromPosition } from "../../helpers.ts";
import { IPiece } from "../../constants/pieces";

interface IContainerProps {
  position: string;
}

interface IPositionProps extends IContainerProps {
  piece?: IPiece;
}

const PositionContainer = styled.div<IContainerProps>(
  props => `
  width: 100%;
  height: 100%;
  border: solid 1px black;
  background-color: ${colorFromPosition(props.position)};
  `
);

interface IPieceProps {
  piece: IPiece;
}

const Piece = styled.div<IPieceProps>``;

export const Position = ({ position, piece, ...restProps }: IPositionProps) => {
  return (
    <PositionContainer {...restProps} position={position}>
      {piece && <Piece piece={piece} data-testid={piece.id} />}
    </PositionContainer>
  );
};
