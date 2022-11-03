import config from '../../../src/config.json';
import { TestResponses } from '../test.responses';
const backUrl = config.base_url_backend

describe("Reviews create tests", () => {
  it("should be visible", () => {
    cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.mockGamesGetAllResponse()
    cy.mockAdminUserResponse()
    cy.get("[cy-data=navbar-reviews-link]" , {timeout:1000}).click();
    cy.get("[cy-data=reviews-create]", {timeout:1000}).click();
    cy.get("[cy-data=reviews-create-content]").should("be.visible")
    cy.get("[cy-data=reviews-create-score]").should("be.visible")
    cy.get("[cy-data=reviews-create-game]").should("be.visible")
    cy.get("[cy-data=reviews-create-submit]").should("be.visible")
    cy.get("[cy-data=reviews-create-reset]").should("be.visible")
  });

  it("should reset if button pressed", () => {
    cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.mockGamesGetAllResponse()
    cy.mockAdminUserResponse()
    cy.get("[cy-data=navbar-reviews-link]").click();
    cy.get("[cy-data=reviews-create]").click();
    cy.get("[cy-data=reviews-create-content]").type("content")
    cy.get("[cy-data=reviews-create-score]").type("5")
    cy.get("[cy-data=reviews-create-reset]").click()
    cy.get("[cy-data=reviews-create-content]").should("not.have.text")
    cy.get("[cy-data=reviews-create-score]").should("not.have.text")
  });

  it("should show error if submit while blank", () => {
    cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.mockGamesGetAllResponse()
    cy.mockAdminUserResponse()
    cy.get("[cy-data=navbar-reviews-link]").click();
    cy.get("[cy-data=reviews-create]").click();
    cy.get("[cy-data=reviews-create-submit]").click()
    cy.get("[cy-data=reviews-create-content-error]").should("be.visible")
    cy.get("[cy-data=reviews-create-score-error]").should("be.visible")
  });


  it("should send correct request if submit is pressed", () => {
    cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.mockGamesGetAllResponse()
    cy.mockAdminUserResponse()
    cy.intercept('POST', backUrl + '/reviews', (req) => {
      expect(req.body.content).to.equal("Cool Reviews")
      expect(req.body.score).to.equal(5)
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

    cy.get("[cy-data=navbar-reviews-link]").click();
    cy.get("[cy-data=reviews-create]").click();
    cy.get("[cy-data=reviews-create-content]").type("Cool Reviews")
    cy.get("[cy-data=reviews-create-game]").select(1)
    cy.get("[cy-data=reviews-create-score]").type("5")
    cy.get("[cy-data=reviews-create-submit]").click()
    cy.get('[cy-data=reviews-header]').should("have.text","Overzicht van alle reviews")
  });

  it("should show error if error happens", () => {
    cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.mockGamesGetAllResponse()
    cy.mockAdminUserResponse()
    cy.intercept('POST', backUrl + '/reviews', (req) => {
      expect(req.body.content).to.equal("Cool reviews")
      expect(req.body.score).to.equal(5)
      expect(req.body.gameId).to.equal("1")
      expect(req.body.writerId).to.equal("1")
      req.reply(TestResponses.createMockError("Generic Error"))
    });

    cy.get("[cy-data=navbar-reviews-link]").click();
    cy.get("[cy-data=reviews-create]").click();
    cy.get("[cy-data=reviews-create-content]").type("Cool reviews")
    cy.get("[cy-data=reviews-create-game]").select(1)
    cy.get("[cy-data=reviews-create-score]").type("5")
    cy.get("[cy-data=reviews-create-submit]").click()
    cy.get('[cy-data=generic-error]').should("be.visible")
    cy.get('[cy-data=error-message]').should("have.text","Generic Error")
  });
});

export { }