import config from '../../../src/config.json';
const baseUrl = config.base_url_frontend

describe("Footer tests", () => {
	it("should be visible", () => {
		cy.visit(baseUrl)
		cy.get('[cy-data=footer]').should("be.visible")
	});

  it("should be visible after login", () => {
    cy.loginAsUser()
		cy.get('[cy-data=footer]').should("be.visible")
	});

});

export {}