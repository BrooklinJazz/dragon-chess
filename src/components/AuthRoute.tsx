import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface IProps extends RouteProps {
    auth: boolean;
    redirect?: string;
}

export const AuthRoute = ({ auth, redirect = "/", ...props }: any) => auth ? <Route {...props} /> : <Redirect to={redirect} />;
