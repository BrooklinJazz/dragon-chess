import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ChessBoard } from ".";
import store from "../../store";
import { ChessBoardId } from "../../testids";
import { A1, positions, A8, A7 } from "../../constants/positions";
import { primary, secondary } from "../../theme/colors";
import { numberTypeFromPosition, colorFromPosition } from "../../helpers.ts";
import { customRender } from "../../test-utils";
import { BlackPieces, A7Pawn } from "../../constants/pieces";

test("renders chess board", () => {
  const { getByTestId } = customRender(
      <ChessBoard />
  );
  const chessboard = getByTestId(ChessBoardId);
  expect(chessboard).toBeInTheDocument();
});

test("renders a1 position", () => {
  const { getByTestId } = customRender(
      <ChessBoard />
  );
  const a1 = getByTestId(A1);
  expect(a1).toBeInTheDocument();
});

test("renders all positions", () => {
  const { getByTestId } = customRender(
      <ChessBoard />
  );
  positions.forEach(each => {
      const element = getByTestId(each);
      expect(element).toBeInTheDocument();
  })
});

test("renders odd and even colors", () => {
  const { getByTestId } = customRender(
      <ChessBoard />
  );
  positions.forEach(each => {
      const element = getByTestId(each);
      expect(element).toHaveStyle(`background-color: ${colorFromPosition(each)}`);
  })
});

test("renders Pawn Piece", () => {
  const { getByTestId } = customRender(
      <ChessBoard />
  );
  const a7 = getByTestId(A7)
  const a7Pawn = getByTestId(A7Pawn.id)
  expect(a7Pawn).toBeInTheDocument()
});
