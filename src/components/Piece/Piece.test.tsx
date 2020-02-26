import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import store from "../../store";
import { primary, secondary } from "../../theme/colors";
import { A1, A2 } from "../../constants/positions";
import { Pawn } from "../../constants/pieces";
import { Piece } from ".";

test("with pawn", () => {
  const { getByTestId } = render(<Piece height={50} data-testid={Pawn.id} piece={Pawn} />);
  const piece = getByTestId(Pawn.id);
  expect(piece).toBeInTheDocument();
  expect(piece).toHaveClass("fa-chess-pawn")
});
