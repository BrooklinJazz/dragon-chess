import React from "react";
import { connect } from "react-redux";
import { AppState } from "./store";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link} from "react-router-dom";
import { AuthRoute } from "./components/AuthRoute";
import { DevPages } from "./pages/DevPages";
import { Game } from "./pages/Game";
import { Routes, DevRoutes } from "./constants/routes";

export const App = () => {
  return (
    <Router>
      <Switch>
        <AuthRoute auth={process.env.NODE_ENV === 'development'} route={DevRoutes.DEV_PAGES} component={DevPages} />
        <Route path={Routes.GAME} component={Game} />
      </Switch>
    </Router>
  );
};
