import React from "react";
import {  ColumnArrays } from "../../constants/positions";
import { Position } from "./Position";

// grab first element from last array

// [[a1, a2], [b1, b2]] => [[b2, b1], [a2, a1]]
const positionsForBoard = ColumnArrays.reduce((total: string[], each) => {
    return [...total, ...each.slice().reverse()]
}, [])

export const Positions = () => {
    const renderPosition = (position: string) => (<Position key={position} position={position} data-testid={position} />);
    return <>{positionsForBoard.map(renderPosition)}</>;
};
