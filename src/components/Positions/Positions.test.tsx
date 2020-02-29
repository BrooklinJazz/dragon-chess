import React from "react";
import { configureMockStore } from "../../redux/configureMockStore";
import { A2Pawn, mockMove, A7Pawn } from "../../constants/pieces";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { Positions } from ".";
import { selectValidPositions, selectPiece } from "../../redux/selectors";
import { A3, A4, A2 } from "../../constants/positions";
import { customRender } from "../../test-utils";

const expectCanMoveTo = (position: HTMLElement) => {
    expect(position.hasAttribute("disabled")).toBeFalsy()
}
const expectCanNotMoveTo = (position: HTMLElement) => {
    expect(position).toHaveAttribute("disabled");
}

test("disabled positions _ no moving piece", () => {
  const { getByTestId } = customRender(
      <Positions />
  );
  const A3Position = getByTestId(A3);
  expectCanNotMoveTo(A3Position)
});


test("moving A2Pawn _ enabled A3 & A4 position", () => {
  const mockState = {
    movingPiece: A2Pawn,
    pieces: []
  };
  const store = configureMockStore(mockState);

  const { getByTestId } = render(
    <Provider store={store}>
      <Positions />
    </Provider>
  );
  const A3Position = getByTestId(A3);
  expectCanMoveTo(A3Position)
  const A4Position = getByTestId(A4);
  expectCanMoveTo(A4Position)
});

test("moving A2Pawn, A7Pawn in A4Position _ enabled A3 position _ disabled A4 position", () => {

  const mockState = {
    movingPiece: A2Pawn,
    pieces: [mockMove(A7Pawn, A4), A2Pawn]
  };
  const store = configureMockStore(mockState);

  const { getByTestId } = render(
    <Provider store={store}>
      <Positions />
    </Provider>
  );
  const A3Position = getByTestId(A3);
  expectCanMoveTo(A3Position)
  const A4Position = getByTestId(A4);
  expectCanNotMoveTo(A4Position)
})

test.only("moving A2Pawn, A7Pawn in A4Position _ enabled A3 position _ movePawn to A3", () => {

  const mockState = {
    movingPiece: A2Pawn,
    pieces: [A2Pawn]
  };
  const store = configureMockStore(mockState);

  const { getByTestId } = render(
    <Provider store={store}>
      <Positions />
    </Provider>
  );
  const A3Position = getByTestId(A3);
  fireEvent.click(A3Position)
  const a2Piece = selectPiece(store.getState(), A2)
  const a3Piece = selectPiece(store.getState(), A3)
  expect(a2Piece).toBeUndefined()
  expect(a3Piece).toBeDefined()
})