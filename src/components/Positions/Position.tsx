import React, { useRef } from "react";
import styled from "styled-components";
import { colorFromPosition } from "../../helpers.ts";
import { IPiece } from "../../constants/pieces";
import { Piece } from "../Piece";
import { useDimensions } from "../../hooks/useDimensions";
import { useSelector } from "react-redux";
import { selectPiece } from "../../redux/selectors";
import { AppState } from "../../store";

interface IContainerProps {
  position: string;
  disabled?: boolean;
}

interface IPositionProps extends IContainerProps {
  piece?: IPiece;
}

const PositionContainer = styled.div<IContainerProps>(
  props => `
  width: 100%;
  height: 100%;
  border: solid 1px black;
  background-color: ${props.disabled ? colorFromPosition(props.position): "red" };
  display: flex;
  justify-content: center;
  align-items: center;
  `
);

export const Position = ({ position, disabled = true }: IPositionProps) => {
  const target = useRef<HTMLDivElement>(null)
  const {height} = useDimensions(target)
  const piece = useSelector((state: AppState) => selectPiece(state, position))
  return (
    <PositionContainer disabled={disabled} data-testid={position} ref={target} position={position}>
      {piece && <Piece height={height} piece={piece} data-testid={piece.id} />}
    </PositionContainer>
  );
};
