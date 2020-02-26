import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ChessBoard } from ".";
import store from "../../store";
import { ChessBoardId } from "../../testids";
import { A1, positions } from "../../constants/positions";
import { primary, secondary } from "../../theme/colors";
import { numberTypeFromPosition, colorFromPosition } from "../../helpers.ts";

test("renders chess board", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <ChessBoard />
    </Provider>
  );
  const chessboard = getByTestId(ChessBoardId);
  expect(chessboard).toBeInTheDocument();
});

test("renders a1 position", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <ChessBoard />
    </Provider>
  );
  const a1 = getByTestId(A1);
  expect(a1).toBeInTheDocument();
});

test("renders all positions", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <ChessBoard />
    </Provider>
  );
  positions.forEach(each => {
      const element = getByTestId(each);
      expect(element).toBeInTheDocument();
  })
});

test("renders odd and even colors", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <ChessBoard />
    </Provider>
  );
  positions.forEach(each => {
      const element = getByTestId(each);
      expect(element).toHaveStyle(`background-color: ${colorFromPosition(each)}`);
  })
});
