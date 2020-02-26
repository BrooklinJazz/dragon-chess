import React from "react"
import styled from "styled-components";
import { ChessBoardId } from "../../testids";

const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
`

const letters = "abcdefgh".split("")
const numbers = "12345679".split("")


export const ChessBoard = () => {
    return (
        <Container data-testid={ChessBoardId}>Chess</Container>
    )
}