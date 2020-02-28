import React from "react";
import styled from "styled-components";
import { ChessBoardId } from "../../constants/testids";
import { Positions } from "../Positions";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  grid-auto-flow: column;
`;

export const ChessBoard = () => {
  return (
    <Container data-testid={ChessBoardId}>
      <Positions />
    </Container>
  );
};
