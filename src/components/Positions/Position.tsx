import React, { useRef, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { secondary, primary } from "../../theme/colors";
import { colorFromPosition } from "../../helpers.ts";
import { IPiece } from "../../constants/pieces";
import { Piece } from "../Piece";
import { useDimensions } from "../../hooks/useDimensions";

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
  display: flex;
  justify-content: center;
  align-items: center;
  `
);

export const Position = ({ position, piece, ...restProps }: IPositionProps) => {
  const target = useRef<HTMLDivElement>(null)
  const {height, width} = useDimensions(target)
  return (
    <PositionContainer {...restProps} ref={target} position={position}>
      {piece && <Piece height={height} piece={piece} data-testid={piece.id} />}
    </PositionContainer>
  );
};
