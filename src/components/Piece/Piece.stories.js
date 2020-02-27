import React from "react";
import { PageContainer } from "../PageContainer";
import styled from "styled-components";
import { A7Pawn } from "../../constants/pieces";
import { Piece } from ".";

export default {
  title: "Piece",
  component: Piece
};

export const WithPawn = () => (
  <PageContainer>
      <Piece height={50} piece={A7Pawn} />
  </PageContainer>
);
