import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { render } from "@testing-library/react";

export const AllTheProviders = ({ children }: {children: any}) => {
  return <Provider store={store}>{children}</Provider>;
};
export const withProvider = (story: any) => {
  return <Provider store={store}>{story()}</Provider>;
};

export const customRender = (ui: any, options: any = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });
