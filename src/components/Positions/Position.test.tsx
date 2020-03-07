import React from 'react';
import { Provider } from 'react-redux';

import { A7Pawn } from '../../constants/pieces';
import { A1, A2, A3, A7 } from '../../constants/positions';
import { customRender } from '../../test-utils';
import { primary, secondary } from '../../theme/colors';
import { Position } from './Position';

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