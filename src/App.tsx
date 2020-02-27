import React from "react";
import { connect } from "react-redux";
import { AppState } from "./store";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const App = () => {
  return (
    <Container
      className="App"
    >
      App
    </Container>
  );
}