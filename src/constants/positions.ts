const letters = "abcdefgh".split("");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

export const positions = letters.reduce((total: string[], letter) => {
  const column = numbers.map(num => letter + num);
  return [...total, ...column];
}, []);

// prettier-ignore
export const [
    A1, A2, A3, A4, A5, A6, A7, A8,
    B1, B2, B3, B4, B5, B6, B7, B8,
    C1, C2, C3, C4, C5, C6, C7, C8,
    D1, D2, D3, D4, D5, D6, D7, D8,
    E1, E2, E3, E4, E5, E6, E7, E8,
    F1, F2, F3, F4, F5, F6, F7, F8,
    G1, G2, G3, G4, G5, G6, G7, G8,
    H1, H2, H3, H4, H5, H6, H7, H8,
] = positions

export const oddLetters = "aceg";
export const evenLetters = "bdfh";

export const AColumn = positions.filter(each => each[0] === "a");
export const BColumn = positions.filter(each => each[0] === "b");
export const CColumn = positions.filter(each => each[0] === "c");
export const DColumn = positions.filter(each => each[0] === "d");
export const EColumn = positions.filter(each => each[0] === "e");
export const FColumn = positions.filter(each => each[0] === "f");
export const GColumn = positions.filter(each => each[0] === "g");
export const HColumn = positions.filter(each => each[0] === "h");

export const ColumnArrays = [
  AColumn,
  BColumn,
  CColumn,
  DColumn,
  EColumn,
  FColumn,
  GColumn,
  HColumn
];
