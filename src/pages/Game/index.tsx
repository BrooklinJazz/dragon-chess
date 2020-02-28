import React from "react";
import { ChessBoard } from "../../components/Chessboard";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChessContainer = styled.div`
  height: 500px;
  width: 500px;
`;
export const Game = () => {
  return (
    <Container className="App">
      <ChessContainer>
        <ChessBoard />
      </ChessContainer>
    </Container>
  );
};
