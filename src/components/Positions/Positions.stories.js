import React from "react";
import { Positions } from ".";
import { PageContainer } from "../PageContainer";
import { Position } from "./Position";
import { primary } from "../../theme/colors";
import styled from "styled-components";
import { colorFromPosition } from "../../helpers.ts";
import { A1, A2 } from "../../constants/positions";

export default {
  title: "Positions",
  component: Positions
};

const PositionContainer = styled.div`
  display: flex;
  height: 50px;
  width: 50px;
`;

export const EvenPosition = () => (
  <PageContainer>
    <PositionContainer>
      <Position color={colorFromPosition(A1)} />
    </PositionContainer>
  </PageContainer>
);
export const OddPosition = () => (
  <PageContainer>
    <PositionContainer>
      <Position color={colorFromPosition(A2)} />
    </PositionContainer>
  </PageContainer>
);
