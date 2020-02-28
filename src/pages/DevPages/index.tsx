import React from "react";
import { Game } from "../Game";
import { DevRoutes } from "../../constants/routes";
import { Route } from "react-router";

export const DevPages = () => {
  return (
    <Route component={Game} route={DevRoutes.CHESSBOARD} />
  )
};
