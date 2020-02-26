import React from "react";
import { ChessBoard } from ".";
import styled from "styled-components";

export default {
  title: "ChessBoard",
  component: ChessBoard
};

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

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
