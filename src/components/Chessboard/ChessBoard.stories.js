import React from "react";
import { ChessBoard } from ".";
import styled from "styled-components";
import { PageContainer } from "../PageContainer";

export default {
  title: "ChessBoard",
  component: ChessBoard
};

const ChessContainer = styled.div`
  width: 200px;
  height: 200px;
  background-color: grey;
`;

export const Empty = () => (
    <PageContainer>
      <ChessContainer>
        <ChessBoard />
      </ChessContainer>
    </PageContainer>
);
