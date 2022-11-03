import config from '../../../src/config.json';
import { TestResponses } from '../test.responses';
const backUrl = config.base_url_backend

describe("Game create tests", () => {
  it("should be visible", () => {
    cy.loginAsAdmin()
    cy.get('[cy-data=game-create]').click()
    cy.get('[cy-data=game-name]').should("be.visible")
    cy.get('[cy-data=game-boxart]').should("be.visible")
    cy.get('[cy-data=game-submit]').should("be.visible")
    cy.get('[cy-data=game-reset]').should("be.visible")
  });

  it("should reset if button pressed", () => {
    cy.loginAsAdmin()
    cy.get('[cy-data=game-create]').click()
    cy.get('[cy-data=game-name]').type("game")
    cy.get('[cy-data=game-boxart]').type("game")
    cy.get('[cy-data=game-reset]').click()
    cy.get('[cy-data=game-name]').should("not.have.text")
    cy.get('[cy-data=game-boxart]').should("not.have.text")
  });

  it("should show error if submit while blank", () => {
    cy.loginAsAdmin()
    cy.get('[cy-data=game-create]').click()
    cy.get('[cy-data=game-submit]').click()
    cy.get('[cy-data=game-name-error]').should("be.visible")
    cy.get('[cy-data=game-boxart-error]').should("be.visible")
  });

  it("should send correct request if submit is pressed", () => {
    cy.loginAsAdmin()
    cy.mockGamesGetAllResponse()
    cy.intercept('POST', backUrl + '/games', (req) => {
      expect(req.body.name).to.equal("Cool Game")
      expect(req.body.boxart).to.equal("Cool Game")
      req.reply({
        statusCode: 200,
        body: {
          id: "id",
          name: "Cool Game",
          boxart: "Cool Game"
        }
      })
    });

    cy.get('[cy-data=game-create]').click()
    cy.get('[cy-data=game-name]').type("Cool Game")
    cy.get('[cy-data=game-boxart]').type("Cool Game")
    cy.get('[cy-data=game-submit]').click()
    cy.get('[cy-data=game-list-header]').should("have.text","Overzicht van alle games")
  });

  it("should show error if error happens", () => {
    cy.loginAsAdmin()
    cy.intercept('POST', backUrl + '/games', (req) => {
      expect(req.body.name).to.equal("Cool Game")
      expect(req.body.boxart).to.equal("Cool Game")
      req.reply(TestResponses.createMockError("Generic Error"))
    });

    cy.get('[cy-data=game-create]').click()
    cy.get('[cy-data=game-name]').type("Cool Game")
    cy.get('[cy-data=game-boxart]').type("Cool Game")
    cy.get('[cy-data=game-submit]').click()
    cy.get('[cy-data=generic-error]').should("be.visible")
    cy.get('[cy-data=error-message]').should("have.text","Generic Error")
  });
});

export { }