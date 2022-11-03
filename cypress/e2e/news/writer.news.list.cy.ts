import config from '../../../src/config.json';
import { TestResponses } from '../test.responses';
const backUrl = config.base_url_backend
describe("News by writer list tests", () => {
	it("should be visible if news exist", () => {
		cy.loginAsAdmin()
    cy.mockNewsByWriterResponse()
    cy.mockUsersGetAllResponse()
    cy.mockAdminUserNoRolesResponse()
    cy.get("[cy-data=navbar-user-link]").click();
    cy.get('[cy-data=user-list-news-button]').eq(2).click()
		cy.get('[cy-data=news-header]').should("be.visible")
    cy.get('[cy-data=news-table]').should("be.visible")
	});

  it("as admin, should show correct protected options", () => {
    cy.loginAsAdmin()
    cy.mockNewsByWriterResponse()
    cy.mockUsersGetAllResponse()
    cy.mockAdminUserNoRolesResponse()
    cy.get("[cy-data=navbar-user-link]").click();
    cy.get('[cy-data=user-list-news-button]').eq(2).click()
		cy.get('[cy-data=admin-options]').should("be.visible")
	});

  it("should show error if no news exists", () => {
    cy.loginAsAdmin()
    cy.intercept('GET',backUrl+ "/news/byWriter/3", TestResponses.createMockError("No news in database"))
    cy.mockUsersGetAllResponse()
    cy.mockAdminUserNoRolesResponse()
    cy.get("[cy-data=navbar-user-link]").click();
    cy.get('[cy-data=user-list-news-button]').eq(2).click()
    cy.get('[cy-data=no-news-error]').should("be.visible")
	});

});

export {}