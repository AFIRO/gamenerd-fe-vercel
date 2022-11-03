import config from '../../../src/config.json';
import { TestResponses } from '../test.responses';
const backUrl = config.base_url_backend

describe("Game delete tests", () => {
  it("should be visible", () => {
    cy.mockGamesGetSpecificResponse()
    cy.loginAsAdmin()
    cy.get('[cy-data=game-list-item-delete-button]').eq(0).click()
    cy.get('[cy-data=delete-naam]').should("be.visible")
    cy.get('[cy-data=delete-opmerking]').should("be.visible")
    cy.get('[cy-data=delete-submit]').should("be.visible")
    cy.get('[cy-data=delete-cancel]').should("be.visible")
  });

  it("should reset if button pressed", () => {
    cy.mockGamesGetSpecificResponse()
    cy.loginAsAdmin()
    cy.get('[cy-data=game-list-item-delete-button]').eq(0).click()
    cy.get('[cy-data=delete-cancel]').click()
    cy.get('[cy-data=game-list-header]').should("have.text","Overzicht van alle games")
  });

  it("should send correct request if submit is pressed", () => {
    cy.loginAsAdmin()
    cy.mockGamesGetSpecificResponse()

    cy.intercept('DELETE', backUrl + '/games/1', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          id: "1",
          name: "Cool Game",
          boxart: "Cool Game"
        }
      })
    });

    cy.get('[cy-data=game-list-item-delete-button]').eq(0).click()
    cy.get('[cy-data=delete-submit]').click()
    cy.get('[cy-data=game-list-header]').should("have.text","Overzicht van alle games")
  });

  it("should show error if error happens", () => {
    cy.loginAsAdmin()
    cy.mockGamesGetSpecificResponse()

    cy.intercept('DELETE', backUrl + '/games/1', (req) => {
      req.reply(TestResponses.createMockError("Generic Error"))
    });

    cy.get('[cy-data=game-list-item-delete-button]').eq(0).click()
    cy.get('[cy-data=delete-submit]').click()
    cy.get('[cy-data=generic-error]').should("be.visible")
    cy.get('[cy-data=error-message]').should("have.text","Generic Error")
  });

});

export { }