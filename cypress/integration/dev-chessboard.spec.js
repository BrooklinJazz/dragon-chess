import { DevRoutes } from "../../src/constants/routes";
import { ChessBoardId } from "../../src/constants/testids";

const getById = (id) => cy.get(`[data-testid="${id}"]`)
describe("ChessBoard Dev", () => {
  it("Renders the Chessboard", () => {
    cy.visit(DevRoutes.CHESSBOARD);
    getById(ChessBoardId)
  });
});
