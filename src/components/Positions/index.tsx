import React from "react";
import {  ColumnArrays, positions } from "../../constants/positions";
import { Position } from "./Position";
import { selectValidPositions } from "../../redux/selectors";
import { useSelector } from "react-redux";

// grab first element from last array

// [[a1, a2], [b1, b2]] => [[b2, b1], [a2, a1]]
const positionsForBoard = ColumnArrays.reduce((total: string[], each) => {
    return [...total, ...each.slice().reverse()]
}, [])

export const Positions = () => {
    const validPositions = useSelector(selectValidPositions)
    const renderPosition = (position: string) => (<Position key={position} disabled={!validPositions.some(each => each === position)} position={position} data-testid={position} />);
    return <>{positionsForBoard.map(renderPosition)}</>;
};
