import React from "react";
import { Positions } from ".";
import { PageContainer } from "../PageContainer";
import { Position } from "./Position";
import styled from "styled-components";
import { A1, A2, A7 } from "../../constants/positions";

export default {
  title: "Positions",
  component: Positions
};

const PositionContainer = styled.div`
  display: flex;
  height: 50px;
  width: 50px;
`;

export const A1Rook = () => (
  <PageContainer>
    <PositionContainer>
      <Position position={A1} />
    </PositionContainer>
  </PageContainer>
);

export const A2Pawn = () => (
  <PageContainer>
    <PositionContainer>
      <Position position={A2}/>
    </PositionContainer>
  </PageContainer>
);

export const A7Pawn = () => (
  <PageContainer>
    <PositionContainer>
      <Position position={A7} />
    </PositionContainer>
  </PageContainer>
);
