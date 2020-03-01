import React from "react";
import { configureMockStore } from "../../redux/configureMockStore";
import { A2Pawn, mockMove, A7Pawn } from "../../constants/pieces";
import { render, fireEvent } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import { Positions } from ".";
import { selectValidPositions, selectPiece, selectMovingPiece } from "../../redux/selectors";
import { A3, A4, A2, B2, B3 } from "../../constants/positions";
import { customRender } from "../../test-utils";
import { AppState } from "../../store";

const expectCanMoveTo = (position: HTMLElement) => {
    expect(position.hasAttribute("disabled")).toBeFalsy()
}
const expectCanNotMoveTo = (position: HTMLElement) => {
    expect(position).toHaveAttribute("disabled");
}
const expectIsMoving = (id: string, store: any) => {
    const movingPiece = selectMovingPiece(store.getState())
    expect(movingPiece && movingPiece.id === id).toBeTruthy();
}

test("disabled positions _ no moving piece", () => {
  const { getByTestId } = customRender(
      <Positions />
  );
  const A3Position = getByTestId(A3);
  expectCanNotMoveTo(A3Position)
});

test("disabled positions _ no moving piece _ initiate move", () => {
  const mockState = {
    movingPiece: undefined,
    pieces: [A2Pawn]
  };
  const store = configureMockStore(mockState);

  const { getByTestId } = render(
    <Provider store={store}>
      <Positions />
    </Provider>
  );
  const A2PawnEl = getByTestId(A2Pawn.id);
  const A3Position = getByTestId(A3);
  const A4Position = getByTestId(A4);
  fireEvent.click(A2PawnEl)
  expectIsMoving(A2Pawn.id, store)
  expectCanMoveTo(A3Position)
  expectCanMoveTo(A4Position)
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
  const A4Position = getByTestId(A4);
  expectCanMoveTo(A3Position)
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

test("moving A2Pawn, A7Pawn in A4Position _ enabled A3 position _ movePawn to A3", () => {

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
  expect(a3Piece).toEqual({...A2Pawn, position: A3})
})

test("initiateMove and movePiece _ A2Pawn _ fresh board", () => {
  const store = configureMockStore();

  const { getByTestId } = render(
    <Provider store={store}>
      <Positions />
    </Provider>
  );
  const A2Position = getByTestId(A2);
  const A3Position = getByTestId(A3);
  fireEvent.click(A2Position)
  const validPositions = selectValidPositions(store.getState())
  expect(validPositions).toEqual([A3, A4])
  fireEvent.click(A3Position)
  const a2Piece = selectPiece(store.getState(), A2)
  const a3Piece = selectPiece(store.getState(), A3)
  expect(a2Piece).toBeUndefined()
  expect(a3Piece).toEqual({...A2Pawn, position: A3})
})

test("initiateMove twice", () => {
  const store = configureMockStore();

  const { getByTestId } = render(
    <Provider store={store}>
      <Positions />
    </Provider>
  );
  const A2Position = getByTestId(A2);
  const B2Position = getByTestId(B2);
  fireEvent.click(A2Position)
  fireEvent.click(B2Position)
  const b2Piece = selectPiece(store.getState(), B2)
  expect(selectMovingPiece(store.getState())).toEqual(b2Piece)
})

test("initiateMove _ cancelMove", () => {
  const store = configureMockStore();

  const { getByTestId } = render(
    <Provider store={store}>
      <Positions />
    </Provider>
  );
  const A2Position = getByTestId(A2);
  const B3Position = getByTestId(B3);
  fireEvent.click(A2Position)
  fireEvent.click(B3Position)
  expect(selectMovingPiece(store.getState())).toBeUndefined()
})