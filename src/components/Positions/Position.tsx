import React, { useRef } from "react";
import styled from "styled-components";
import { colorFromPosition } from "../../helpers.ts";
import { IPiece } from "../../constants/pieces";
import { Piece } from "../Piece";
import { useDimensions } from "../../hooks/useDimensions";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPiece,
  selectMovingPiece,
  selectValidPositions
} from "../../redux/selectors";
import { AppState } from "../../store";
import { movePiece, initiateMove, cancelMove } from "../../redux/game";

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
  background-color: ${colorFromPosition(props.position)};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  `
);

const Circle = styled.div`
  width: 50%;
  height: 50%;
  background-color: whitesmoke;
  border-radius: 50%;
  position: absolute;
`;

export const Position = ({ position }: IPositionProps) => {
  const target = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(target);

  const piece = useSelector((state: AppState) => selectPiece(state, position));
  const movingPiece = useSelector(selectMovingPiece);
  const validPositions = useSelector(selectValidPositions);
  const isValidMove =
    validPositions.some(each => each === position) && movingPiece;

  const dispatch = useDispatch();

  // TODO I can improve this logic
  const handleClick = () => (isValidMove ? handleMove() : requestMove());
  const handleMove = () => {
    if (isValidMove) {
      dispatch(movePiece({ position }));
    }
  };
  const requestMove = () => {
    if (movingPiece) {
      dispatch(cancelMove());
    }
    if (piece) {
      dispatch(initiateMove({ piece }));
    }
  };

  return (
    <PositionContainer
      onClick={handleClick}
      disabled={!isValidMove}
      data-testid={position}
      ref={target}
      position={position}
    >
      {isValidMove && <Circle />}
      {piece && <Piece height={height} piece={piece} data-testid={piece.id} />}
    </PositionContainer>
  );
};
