import { TestResponses } from '../test.responses';

describe("Gamelist tests", () => {
	it("should be visible if games exist", () => {
		cy.loginAsAdmin()
		cy.get('[cy-data=game-table]').should("be.visible")
	});

  it("As admin, admin options should be visible if games exist", () => {
		cy.loginAsAdmin()
		cy.get('[cy-data=admin-options]').should("be.visible")
	});

  it("As user, admin options should not be visible if games exist", () => {
		cy.loginAsUser()
		cy.get('[cy-data=admin-options]').should("not.exist")
	});

  it("As admin, protected buttons should be visible if games exist", () => {
		cy.loginAsAdmin()
		cy.get('[cy-data=game-create]').should("be.visible")
	});

  it("As user, protected buttons should not be visible if games exist", () => {
		cy.loginAsUser()
		cy.get('[cy-data=game-create]').should("not.exist")
	});

  it("should show error if no games", () => {
    cy.mockLoginResponseAdmin()
    cy.intercept('GET',"http://localhost:9000/api/games", TestResponses.createMockError("No games in database"))
    cy.login("admin","admin")
		cy.get('[cy-data=no-games-error]').should("be.visible")
	});

});

export {}