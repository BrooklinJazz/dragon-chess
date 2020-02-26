import React from "react";
import { positions } from "../../constants/positions";
import { colorFromPosition } from "../../helpers.ts";
import { Position } from "./Position";

export const Positions = () => {
    const renderPosition = (position: string) => (<Position color={colorFromPosition(position)} key={position} data-testid={position} />);
    return <>{positions.map(renderPosition)}</>;
};
