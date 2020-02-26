import React, { HtmlHTMLAttributes } from "react";
import styled from "styled-components";
import { ChessBoardId } from "../../testids";
import { A1, positions } from "../../constants/positions";
import { secondary, primary } from "../../theme/colors";
import { numberFromPosition, colorFromPosition } from "../../helpers.ts";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

interface IPositionProps {
    color: typeof primary | typeof secondary
}

const Position = styled.div<IPositionProps>(props => `
  width: 100%;
  height: 100%;
  border: solid 1px black;
  background-color: ${props.color};
`);

const Positions = () => {
  const renderPosition = (position: string) => (
    <Position color={colorFromPosition(position)} key={position} data-testid={position} />
  );
  return <>{positions.map(renderPosition)}</>;
};

export const ChessBoard = () => {
  return (
    <Container data-testid={ChessBoardId}>
      <Positions />
    </Container>
  );
};
