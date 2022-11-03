describe("Game list item tests", () => {
	it("should be visible if games exist", () => {
		cy.loginAsAdmin()
		cy.get('[cy-data=game-list-item]').should("be.visible")
	});

  it("should have correct data based on mock", () => {
		cy.loginAsAdmin()
		cy.get('[cy-data="game-list-item-name"]').eq(0).should("have.text","Devil May Cry 3: Dante's Awakening")
	});

  it("render correct unprotected buttons", () => {
		cy.loginAsAdmin()
		cy.get('[cy-data="game-list-item-news-button"]').should("be.visible")
    cy.get('[cy-data="game-list-item-reviews-button"]').should("be.visible")
	});

  it("As admin, should render protected buttons", () => {
		cy.loginAsAdmin()
		cy.get('[cy-data="game-list-item-edit-button"]').should("be.visible")
    cy.get('[cy-data="game-list-item-delete-button"]').should("be.visible")
	});

  it("As user, not render protected buttons", () => {
		cy.loginAsUser()
		cy.get('[cy-data="game-list-item-edit-button"]').should("not.exist")
    cy.get('[cy-data="game-list-item-delete-button"]').should("not.exist")
	});
});

export {}