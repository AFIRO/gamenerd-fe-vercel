import config from '../../../src/config.json';
import { TestResponses } from '../test.responses';
const backUrl = config.base_url_backend
describe("News by game list tests", () => {
	it("should be visible if news exist", () => {
		cy.loginAsAdmin()
    cy.mockNewsByGameResponse()
    cy.mockGamesGetSpecificResponse()
    cy.get("[cy-data=game-list-item-news-button]").eq(0).click();
		cy.get('[cy-data=news-header]').should("be.visible")
    cy.get('[cy-data=news-create]').should("be.visible")
    cy.get('[cy-data=news-table]').should("be.visible")
	});

  it("as admin, should show correct protected options", () => {
    cy.loginAsAdmin()
    cy.mockNewsByGameResponse()
    cy.mockGamesGetSpecificResponse()
    cy.get("[cy-data=game-list-item-news-button]").eq(0).click();
		cy.get('[cy-data=admin-options]').should("be.visible")
	});

  it("as writer, should show correct protected options and hide correct options", () => {
		cy.loginAsWriter()
    cy.mockNewsByGameResponse()
    cy.mockGamesGetSpecificResponse()
    cy.get("[cy-data=game-list-item-news-button]").eq(0).click();
    cy.get('[cy-data=admin-options]').should("not.exist")
    cy.get('[cy-data=news-create]').should("be.visible")
		cy.get('[cy-data=writer-options]').should("be.visible")
	});

  it("as user, should show no protected options", () => {
		cy.loginAsUser()
    cy.mockNewsByGameResponse()
    cy.mockGamesGetSpecificResponse()
    cy.get("[cy-data=game-list-item-news-button]").eq(0).click();
    cy.get('[cy-data=admin-options]').should("not.exist")
		cy.get('[cy-data=writer-options]').should("not.exist")
    cy.get('[cy-data=news-create]').should("not.exist")
	});

  it("should show error if no news exists", () => {
    cy.loginAsAdmin()
    cy.mockGamesGetSpecificResponse()
    cy.intercept('GET',backUrl+ "/news/byGame/1", TestResponses.createMockError("No news in database"))
    cy.get("[cy-data=game-list-item-news-button]").eq(0).click();
    cy.get('[cy-data=no-news-error]').should("be.visible")
	});

});

export {}