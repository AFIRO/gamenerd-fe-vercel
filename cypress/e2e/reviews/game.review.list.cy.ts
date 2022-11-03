import config from '../../../src/config.json';
import { TestResponses } from '../test.responses';
const backUrl = config.base_url_backend
describe("Reviews by game list tests", () => {
	it("should be visible if reviews exist", () => {
		cy.loginAsAdmin()
    cy.mockReviewsByGameResponse()
    cy.mockGamesGetSpecificResponse()
    cy.get("[cy-data=game-list-item-reviews-button]").eq(0).click();
		cy.get('[cy-data=reviews-header]').should("be.visible")
    cy.get('[cy-data=reviews-create]').should("be.visible")
    cy.get('[cy-data=reviews-table]').should("be.visible")
	});

  it("as admin, should show correct protected options", () => {
    cy.loginAsAdmin()
    cy.mockReviewsByGameResponse()
    cy.mockGamesGetSpecificResponse()
    cy.get("[cy-data=game-list-item-reviews-button]").eq(0).click();
		cy.get('[cy-data=admin-options]').should("be.visible")
	});

  it("as writer, should show correct protected options and hide correct options", () => {
		cy.loginAsWriter()
    cy.mockReviewsByGameResponse()
    cy.mockGamesGetSpecificResponse()
    cy.get("[cy-data=game-list-item-reviews-button]").eq(0).click();
    cy.get('[cy-data=admin-options]').should("not.exist")
    cy.get('[cy-data=reviews-create]').should("be.visible")
		cy.get('[cy-data=writer-options]').should("be.visible")
	});

  it("as user, should show no protected options", () => {
		cy.loginAsUser()
    cy.mockReviewsByGameResponse()
    cy.mockGamesGetSpecificResponse()
    cy.get("[cy-data=game-list-item-reviews-button]").eq(0).click();
    cy.get('[cy-data=admin-options]').should("not.exist")
		cy.get('[cy-data=writer-options]').should("not.exist")
    cy.get('[cy-data=reviews-create]').should("not.exist")
	});

  it("should show error if no reviews exists", () => {
    cy.loginAsAdmin()
    cy.mockGamesGetSpecificResponse()
    cy.intercept('GET',backUrl+ "/reviews/byGame/1", TestResponses.createMockError("No reviews in database"))
    cy.get("[cy-data=game-list-item-reviews-button]").eq(0).click();
    cy.get('[cy-data=no-reviews-error]').should("be.visible")
	});

});

export {}