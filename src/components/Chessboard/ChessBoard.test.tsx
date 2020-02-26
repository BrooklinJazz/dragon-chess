import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ChessBoard } from ".";
import store from "../../store";

test("renders example app", () => {
  const { getByText } = render(
    <Provider store={store}>
      <ChessBoard />
    </Provider>
  );
  const linkElement = getByText("Chess");
  expect(linkElement).toBeInTheDocument();
});
