import {Position} from "./Position"
import { A1, A2, A3, A4, A5, A6, A7, A8, B1, C1, D1, E1, F1, G1, H1, B2, C3 } from "../constants/positions"
import { Player } from "../redux/types"

test("Position .up", () => {
    const a1 = new Position(A1)
    expect(a1.up().save().value()).toEqual(A2)
    expect(a1.up().save().value()).toEqual(A3)
    expect(a1.up().save().value()).toEqual(A4)
    expect(a1.up().save().value()).toEqual(A5)
    expect(a1.up().save().value()).toEqual(A6)
    expect(a1.up().save().value()).toEqual(A7)
    expect(a1.up().save().value()).toEqual(A8)
    expect(a1.up().save().value()).toEqual(undefined)
})

test("Position .up _ black player", () => {
    const a7 = new Position(A8, Player.black)
    expect(a7.up().save().value()).toEqual(A7)
    expect(a7.up().save().value()).toEqual(A6)
    expect(a7.up().save().value()).toEqual(A5)
    expect(a7.up().save().value()).toEqual(A4)
    expect(a7.up().save().value()).toEqual(A3)
    expect(a7.up().save().value()).toEqual(A2)
    expect(a7.up().save().value()).toEqual(A1)
    expect(a7.up().save().value()).toEqual(undefined)
})


test("Position .down", () => {
    const a8 = new Position(A8)
    expect(a8.down().save().value()).toEqual(A7)
    expect(a8.down().save().value()).toEqual(A6)
    expect(a8.down().save().value()).toEqual(A5)
    expect(a8.down().save().value()).toEqual(A4)
    expect(a8.down().save().value()).toEqual(A3)
    expect(a8.down().save().value()).toEqual(A2)
    expect(a8.down().save().value()).toEqual(A1)
    expect(a8.down().save().value()).toEqual(undefined)
})

test("Position .down _ black player", () => {
    const a1 = new Position(A1, Player.black)
    expect(a1.down().save().value()).toEqual(A2)
    expect(a1.down().save().value()).toEqual(A3)
    expect(a1.down().save().value()).toEqual(A4)
    expect(a1.down().save().value()).toEqual(A5)
    expect(a1.down().save().value()).toEqual(A6)
    expect(a1.down().save().value()).toEqual(A7)
    expect(a1.down().save().value()).toEqual(A8)
    expect(a1.down().save().value()).toEqual(undefined)
})

test("Position .right", () => {
    const a1 = new Position(A1)
    expect(a1.right().save().value()).toEqual(B1)
    expect(a1.right().save().value()).toEqual(C1)
    expect(a1.right().save().value()).toEqual(D1)
    expect(a1.right().save().value()).toEqual(E1)
    expect(a1.right().save().value()).toEqual(F1)
    expect(a1.right().save().value()).toEqual(G1)
    expect(a1.right().save().value()).toEqual(H1)
    expect(a1.right().save().value()).toEqual(undefined)
})

test("Position .right _ black", () => {
    const h1 = new Position(H1, Player.black)
    expect(h1.right().save().value()).toEqual(G1)
    expect(h1.right().save().value()).toEqual(F1)
    expect(h1.right().save().value()).toEqual(E1)
    expect(h1.right().save().value()).toEqual(D1)
    expect(h1.right().save().value()).toEqual(C1)
    expect(h1.right().save().value()).toEqual(B1)
    expect(h1.right().save().value()).toEqual(A1)
    expect(h1.right().save().value()).toEqual(undefined)
})

test("Position .left", () => {
    const h1 = new Position(H1)
    expect(h1.left().save().value()).toEqual(G1)
    expect(h1.left().save().value()).toEqual(F1)
    expect(h1.left().save().value()).toEqual(E1)
    expect(h1.left().save().value()).toEqual(D1)
    expect(h1.left().save().value()).toEqual(C1)
    expect(h1.left().save().value()).toEqual(B1)
    expect(h1.left().save().value()).toEqual(A1)
    expect(h1.left().save().value()).toEqual(undefined)
})

test("Position .left _ black player", () => {
    const a1 = new Position(A1, Player.black)
    expect(a1.left().save().value()).toEqual(B1)
    expect(a1.left().save().value()).toEqual(C1)
    expect(a1.left().save().value()).toEqual(D1)
    expect(a1.left().save().value()).toEqual(E1)
    expect(a1.left().save().value()).toEqual(F1)
    expect(a1.left().save().value()).toEqual(G1)
    expect(a1.left().save().value()).toEqual(undefined)
})

test("value", () => {
    const b2 = new Position(B2)
    const c3 = new Position(C3)
    expect(b2.up().right().value()).toEqual(C3)
    expect(b2.up().left().left().value()).toEqual(undefined)
    expect(b2.down().down().down().value()).toEqual(undefined)
    expect(b2.down().down().value()).toEqual(undefined)
    expect(c3.left().left().left().value()).toEqual(undefined)
})