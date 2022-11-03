import { TestResponses } from "../test.responses";

describe("Review list tests", () => {
	it("should be visible if reviews exist", () => {
		cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.get("[cy-data=navbar-reviews-link]").click();
		cy.get('[cy-data=reviews-header]').should("be.visible")
    cy.get('[cy-data=reviews-table]').should("be.visible")
	});

  it("as admin, should show correct protected options", () => {
		cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.get("[cy-data=navbar-reviews-link]").click();
		cy.get('[cy-data=admin-options]').should("be.visible")
	});

  it("as writer, should show correct protected options and hide correct options", () => {
		cy.loginAsWriter()
    cy.mockReviewsGetAllResponse()
    cy.get("[cy-data=navbar-reviews-link]").click();
    cy.get('[cy-data=admin-options]').should("not.exist")
    cy.get('[cy-data=reviews-create]').should("be.visible")
		cy.get('[cy-data=writer-options]').should("be.visible")
	});

  it("as user, should show no protected options", () => {
		cy.loginAsUser()
    cy.mockReviewsGetAllResponse()
    cy.get("[cy-data=navbar-reviews-link]").click();
    cy.get('[cy-data=admin-options]').should("not.exist")
		cy.get('[cy-data=writer-options]').should("not.exist")
    cy.get('[cy-data=reviews-create]').should("not.exist")
	});

  it("should show error if no reviews exists", () => {
		cy.loginAsAdmin()
    cy.intercept('GET',"http://localhost:9000/api/reviews", TestResponses.createMockError("No reviews in database"))
    cy.get("[cy-data=navbar-reviews-link]").click();
    cy.get('[cy-data=no-reviews-error]').should("be.visible")
	});

});

export {}