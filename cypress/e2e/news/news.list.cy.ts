import { TestResponses } from "../test.responses";

describe("News list tests", () => {
	it("should be visible if news exist", () => {
		cy.loginAsAdmin()
    cy.mockNewsGetAllResponse()
    cy.get("[cy-data=navbar-news-link]",{timeout:1000}).click();
		cy.get('[cy-data=news-header]').should("be.visible")
    cy.get('[cy-data=news-table]').should("be.visible")
	});

  it("as admin, should show correct protected options", () => {
		cy.loginAsAdmin()
    cy.mockNewsGetAllResponse()
    cy.get("[cy-data=navbar-news-link]").click();
		cy.get('[cy-data=admin-options]').should("be.visible")
	});

  it("as write, should show correct protected options and hide correct options", () => {
		cy.loginAsWriter()
    cy.mockNewsGetAllResponse()
    cy.get("[cy-data=navbar-news-link]").click();
    cy.get('[cy-data=admin-options]').should("not.exist")
    cy.get('[cy-data=news-create]').should("be.visible")
		cy.get('[cy-data=writer-options]').should("be.visible")
	});

  it("as user, should show no protected options", () => {
		cy.loginAsUser()
    cy.mockNewsGetAllResponse()
    cy.get("[cy-data=navbar-news-link]").click();
    cy.get('[cy-data=admin-options]').should("not.exist")
		cy.get('[cy-data=writer-options]').should("not.exist")
    cy.get('[cy-data=news-create]').should("not.exist")
	});

  it("should show error if no news exists", () => {
		cy.loginAsAdmin()
    cy.intercept('GET',"http://localhost:9000/api/news", TestResponses.createMockError("No news in database"))
    cy.get("[cy-data=navbar-news-link]").click();
    cy.get('[cy-data=no-news-error]').should("be.visible")
	});

});

export {}