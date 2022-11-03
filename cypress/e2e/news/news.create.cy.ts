import config from '../../../src/config.json';
import { TestResponses } from '../test.responses';
const backUrl = config.base_url_backend

describe("News create tests", () => {
  it("should be visible", () => {
    cy.loginAsAdmin()
    cy.mockNewsGetAllResponse()
    cy.mockGamesGetAllResponse()
    cy.mockAdminUserResponse()
    cy.get("[cy-data=navbar-news-link]", {timeout:1000}).click();
    cy.get("[cy-data=news-create]", {timeout:1000}).click();
    cy.get("[cy-data=news-create-content]").should("be.visible")
    cy.get("[cy-data=news-create-game]").should("be.visible")
    cy.get("[cy-data=news-create-submit]").should("be.visible")
    cy.get("[cy-data=news-create-reset]").should("be.visible")
  });

  it("should reset if button pressed", () => {
    cy.loginAsAdmin()
    cy.mockNewsGetAllResponse()
    cy.mockGamesGetAllResponse()
    cy.mockAdminUserResponse()
    cy.get("[cy-data=navbar-news-link]").click();
    cy.get("[cy-data=news-create]").click();
    cy.get("[cy-data=news-create-content]").type("content")
    cy.get("[cy-data=news-create-reset]").click()
    cy.get("[cy-data=news-create-content]").should("not.have.text")
  });

  it("should show error if submit while blank", () => {
    cy.loginAsAdmin()
    cy.mockNewsGetAllResponse()
    cy.mockGamesGetAllResponse()
    cy.mockAdminUserResponse()
    cy.get("[cy-data=navbar-news-link]").click();
    cy.get("[cy-data=news-create]").click();
    cy.get("[cy-data=news-create-submit]").click()
    cy.get("[cy-data=news-create-content-error]").should("be.visible")
  });


  it("should send correct request if submit is pressed", () => {
    cy.loginAsAdmin()
    cy.mockNewsGetAllResponse()
    cy.mockGamesGetAllResponse()
    cy.mockAdminUserResponse()
    cy.intercept('POST', backUrl + '/news', (req) => {
      expect(req.body.content).to.equal("Cool News")
      expect(req.body.gameId).to.equal("1")
      expect(req.body.writerId).to.equal("1")
      req.reply({
        statusCode: 200,
        body: {
          id: "id",
          content: "Cool Game",
          writer: {id: "1", name: "admin"},
          game: {id: "1", name:"Bayonetta 2"} 
        }
      })
    });

    cy.get("[cy-data=navbar-news-link]").click();
    cy.get("[cy-data=news-create]").click();
    cy.get("[cy-data=news-create-content]").type("Cool News")
    cy.get("[cy-data=news-create-game]").select(1)
    cy.get("[cy-data=news-create-submit]").click()
    cy.get('[cy-data=news-header]').should("have.text","Overzicht van alle news")
  });

  it("should show error if error happens", () => {
    cy.loginAsAdmin()
    cy.mockNewsGetAllResponse()
    cy.mockGamesGetAllResponse()
    cy.mockAdminUserResponse()
    cy.intercept('POST', backUrl + '/news', (req) => {
      expect(req.body.content).to.equal("Cool News")
      expect(req.body.gameId).to.equal("1")
      expect(req.body.writerId).to.equal("1")
      req.reply(TestResponses.createMockError("Generic Error"))
    });

    cy.get("[cy-data=navbar-news-link]").click();
    cy.get("[cy-data=news-create]").click();
    cy.get("[cy-data=news-create-content]").type("Cool News")
    cy.get("[cy-data=news-create-game]").select(1)
    cy.get("[cy-data=news-create-submit]").click()
    cy.get('[cy-data=generic-error]').should("be.visible")
    cy.get('[cy-data=error-message]').should("have.text","Generic Error")
  });
});

export { }