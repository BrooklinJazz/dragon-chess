import React, { HtmlHTMLAttributes } from "react";
import styled from "styled-components";
import { ChessBoardId } from "../../testids";
import { A1 } from "../../constants/positions";
import { numberFromPosition } from "../../helpers.ts";
import { Positions } from "../Positions";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

export const ChessBoard = () => {
  return (
    <Container data-testid={ChessBoardId}>
      <Positions />
    </Container>
  );
};
