import React, { useRef } from "react";
import styled from "styled-components";
import { colorFromPosition } from "../../helpers.ts";
import { IPiece } from "../../constants/pieces";
import { Piece } from "../Piece";
import { useDimensions } from "../../hooks/useDimensions";
import { useSelector, useDispatch } from "react-redux";
import { selectPiece, selectMovingPiece, selectValidPositions } from "../../redux/selectors";
import { AppState } from "../../store";
import { movePiece, initiateMove } from "../../redux/game";

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

export const Position = ({ position }: IPositionProps) => {
  const target = useRef<HTMLDivElement>(null)
  const {height} = useDimensions(target)
  const piece = useSelector((state: AppState) => selectPiece(state, position))
  const movingPiece = useSelector(selectMovingPiece)
  const dispatch = useDispatch()
  const handleClick = () => movingPiece ? handleMove() : requestMove()
  const validPositions = useSelector(selectValidPositions)
  const isValidMove = validPositions.some(each => each === position) && movingPiece
  const handleMove = () => {
    if (isValidMove) {
      dispatch(movePiece({position}))
    }
  }
  const requestMove = () => {
    if (!movingPiece && piece) {
      dispatch(initiateMove({piece}))
    }
  }
  return (
    <PositionContainer onClick={handleClick} disabled={!isValidMove} data-testid={position} ref={target} position={position}>
      {piece && <Piece height={height} piece={piece} data-testid={piece.id} />}
    </PositionContainer>
  );
};
