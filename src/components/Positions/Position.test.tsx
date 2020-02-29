import React from "react";
import { Position } from "./Position";
import { Provider } from "react-redux";
import { primary, secondary } from "../../theme/colors";
import { A1, A2, A7, A3 } from "../../constants/positions";
import { A7Pawn, A2Pawn } from "../../constants/pieces";
import { customRender } from "../../test-utils";
import { configureMockStore } from "../../redux/configureMockStore";
import { selectValidPositions } from "../../redux/selectors";
import { render, prettyDOM } from "@testing-library/react";

test("with a1", () => {
  const { getByTestId } = customRender(
    <Position data-testid={A1} position={A1} />
  );
  const position = getByTestId(A1);
  expect(position).toHaveStyle(`background-color: ${primary}`);
});

test("with a2", () => {
  const { getByTestId } = customRender(
    <Position data-testid={A2} position={A2} />
  );
  const position = getByTestId(A2);
  expect(position).toHaveStyle(`background-color: ${secondary}`);
});

test("with pawn", () => {
  const { getByTestId } = customRender(
    <Position data-testid={A7} position={A7} />
  );
  const position = getByTestId(A7);
  const piece = getByTestId(A7Pawn.id);
  expect(position).toBeInTheDocument();
  expect(piece).toBeInTheDocument();
});