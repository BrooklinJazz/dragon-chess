import React from "react";
import { A7Pawn, A2Pawn } from "../../constants/pieces";
import { Piece } from ".";
import { customRender } from "../../test-utils";

test("with black pawn", () => {
  const { getByTestId } = customRender(<Piece height={50} data-testid={A7Pawn.id} piece={A7Pawn} />);
  const piece = getByTestId(A7Pawn.id);
  expect(piece).toBeInTheDocument();
  expect(piece).toHaveClass("fa-chess-pawn")
  expect(piece).toHaveStyle("color: black")
});

test("with white pawn", () => {
  const { getByTestId } = customRender(<Piece height={50} data-testid={A2Pawn.id} piece={A2Pawn} />);
  const piece = getByTestId(A2Pawn.id);
  expect(piece).toBeInTheDocument();
  expect(piece).toHaveClass("fa-chess-pawn")
  expect(piece).toHaveStyle("color: white")
});
