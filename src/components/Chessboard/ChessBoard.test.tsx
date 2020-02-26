import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ChessBoard } from ".";
import store from "../../store";
import { ChessBoardId } from "../../testids";

test("renders chess board", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <ChessBoard />
    </Provider>
  );
  const linkElement = getByTestId(ChessBoardId);
  expect(linkElement).toBeInTheDocument();
});
