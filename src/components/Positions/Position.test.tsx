import React from "react";
import { Position } from "./Position";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import store from "../../store";
import { primary, secondary } from "../../theme/colors";
import { A1, A2 } from "../../constants/positions";
import { Pawn } from "../../constants/pieces";

test("with a1", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Position data-testid={A1} position={A1} />
    </Provider>
  );
  const position = getByTestId(A1);
  expect(position).toHaveStyle(`background-color: ${primary}`);
});

test("with a2", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Position data-testid={A2} position={A2}/>
    </Provider>
  );
  const position = getByTestId(A2);
  expect(position).toHaveStyle(`background-color: ${secondary}`);
});

test("with pawn", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Position data-testid={A1} position={A1} piece={Pawn}/>
    </Provider>
  );
  const position = getByTestId(A1);
  const piece = getByTestId(Pawn.id);
  expect(position).toBeInTheDocument();
  expect(piece).toBeInTheDocument();
});
