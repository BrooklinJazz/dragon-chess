import React from "react";
import { render } from "@testing-library/react";
import { A7Pawn } from "../../constants/pieces";
import { Piece } from ".";
import { customRender } from "../../test-utils";

test("with pawn", () => {
  const { getByTestId } = customRender(<Piece height={50} data-testid={A7Pawn.id} piece={A7Pawn} />);
  const piece = getByTestId(A7Pawn.id);
  expect(piece).toBeInTheDocument();
  expect(piece).toHaveClass("fa-chess-pawn")
});
