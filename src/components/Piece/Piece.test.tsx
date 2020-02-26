import React from "react";
import { render } from "@testing-library/react";
import { Pawn } from "../../constants/pieces";
import { Piece } from ".";

test("with pawn", () => {
  const { getByTestId } = render(<Piece height={50} data-testid={Pawn.id} piece={Pawn} />);
  const piece = getByTestId(Pawn.id);
  expect(piece).toBeInTheDocument();
  expect(piece).toHaveClass("fa-chess-pawn")
});
