import config from '../../../src/config.json';
import { TestResponses } from '../test.responses';
const backUrl = config.base_url_backend
describe("Reviews by writer list tests", () => {
	it("should be visible if reviews exist", () => {
		cy.loginAsAdmin()
    cy.mockReviewsByWriterResponse()
    cy.mockUsersGetAllResponse()
    cy.mockAdminUserNoRolesResponse()
    cy.get("[cy-data=navbar-user-link]").click();
    cy.get('[cy-data=user-list-reviews-button]').eq(2).click()
		cy.get('[cy-data=reviews-header]').should("be.visible")
    cy.get('[cy-data=reviews-table]').should("be.visible")
	});

  it("as admin, should show correct protected options", () => {
    cy.loginAsAdmin()
    cy.mockReviewsByWriterResponse()
    cy.mockUsersGetAllResponse()
    cy.mockAdminUserNoRolesResponse()
    cy.get("[cy-data=navbar-user-link]").click();
    cy.get('[cy-data=user-list-reviews-button]').eq(2).click()
		cy.get('[cy-data=admin-options]').should("be.visible")
	});

  it("should show error if no reviews exists", () => {
    cy.loginAsAdmin()
    cy.intercept('GET',backUrl+ "/reviews/byWriter/3", TestResponses.createMockError("No reviews in database"))
    cy.mockUsersGetAllResponse()
    cy.mockAdminUserNoRolesResponse()
    cy.get("[cy-data=navbar-user-link]").click();
    cy.get('[cy-data=user-list-reviews-button]').eq(2).click()
    cy.get('[cy-data=no-reviews-error]').should("be.visible")
	});

});

export {}