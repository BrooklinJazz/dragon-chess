import { DevRoutes } from "../../src/constants/routes";
import { ChessBoardId } from "../../src/constants/testids";
import { A2Pawn } from "../../src/constants/pieces";
import { A3, A4 } from "../../src/constants/positions";

const getById = (id: string) => cy.get(`[data-testid="${id}"]`)
describe("ChessBoard Dev", () => {
  it("Renders the Chessboard", () => {
    cy.visit(DevRoutes.CHESSBOARD);
    getById(ChessBoardId)
  });
  it("play example game", () => {
    cy.visit(DevRoutes.CHESSBOARD);
    getById(A2Pawn.id).click()
    // @ts-ignore
    getById(A3).its('validPosition').should('be.true')
    // @ts-ignore
    getById(A4).its('validPosition').should('be.true')
  });
});
