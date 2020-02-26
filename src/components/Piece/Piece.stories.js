import React from "react";
import { PageContainer } from "../PageContainer";
import styled from "styled-components";
import { Pawn } from "../../constants/pieces";
import { Piece } from ".";

export default {
  title: "Piece",
  component: Piece
};

const PieceContainer = styled.div`
  display: flex;
  height: 50px;
  width: 50px;
  justify-content: center;
  align-items: center;
  border: solid black 1px;
`;

export const WithPawn = () => (
  <PageContainer>
      <Piece height={50} piece={Pawn} />
  </PageContainer>
);
