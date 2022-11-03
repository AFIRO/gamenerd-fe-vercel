import config from '../../../src/config.json';
import { TestResponses } from '../test.responses';
const backUrl = config.base_url_backend

describe("Reviews update tests", () => {
  it("should be visible", () => {
    cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.mockReviewsGetSpecificResponse()
    cy.mockGamesGetAllResponse()
    cy.mockAdminUserResponse()
    cy.get("[cy-data=navbar-reviews-link]", {timeout:1000}).click();
    cy.get('[cy-data=reviews-edit]', {timeout:1000}).eq(0).click()
    cy.get('[cy-data=reviews-update]').should("be.visible")
    cy.get('[cy-data=reviews-update-game]').should("be.visible")
    cy.get('[cy-data=reviews-update-content]').should("be.visible")
    cy.get('[cy-data=reviews-update-score]').should("be.visible")
    cy.get('[cy-data=reviews-update-submit]').should("be.visible")
    cy.get('[cy-data=reviews-update-reset]').should("be.visible")
  });

  it("should reset if button pressed", () => {
    cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.mockReviewsGetSpecificResponse()
    cy.mockGamesGetAllResponse()
    cy.mockAdminUserResponse()
    cy.get("[cy-data=navbar-reviews-link]", {timeout:1000}).click();
    cy.get('[cy-data=reviews-edit]').eq(0).click()
    cy.get('[cy-data=reviews-update-reset]').click()
    cy.get('[cy-data=reviews-update-content]').should("not.have.text")
    cy.get('[cy-data=reviews-update-score]').should("not.have.text")
  });

  it("should show error if submit while blank", () => {
    cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.mockReviewsGetSpecificResponse()
    cy.mockGamesGetAllResponse()
    cy.mockAdminUserResponse()
    cy.get("[cy-data=navbar-reviews-link]", {timeout:1000}).click();
    cy.get('[cy-data=reviews-edit]').eq(0).click()
    cy.get('[cy-data=reviews-update-content]').clear()
    cy.get('[cy-data=reviews-update-score]').clear()
    cy.get('[cy-data=reviews-update-submit]').click()
    cy.get('[cy-data=reviews-update-content-error]').should("be.visible")
    cy.get('[cy-data=reviews-update-score-error]').should("be.visible")
  });

  it("should send correct request if submit is pressed", () => {
    cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.mockReviewsGetSpecificResponse()
    cy.mockGamesGetAllResponse()
    cy.mockAdminUserResponse()

    cy.intercept('PUT', backUrl + '/reviews/1', (req) => {
      expect(req.body.content).to.equal("Cool reviews")
      expect(req.body.gameId).to.equal("1")
      expect(req.body.writerId).to.equal("1")
      expect(req.body.score).to.equal(5)
      req.reply({
        statusCode: 200,
        body: {
          id: "id",
          score: 5,
          content: "Cool Game",
          writer: {id: "1", name: "admin"},
          game: {id: "1", name:"Bayonetta 2"} 
        }
      })
    });

    cy.get("[cy-data=navbar-reviews-link]", {timeout:1000}).click();
    cy.get('[cy-data=reviews-edit]').eq(0).click()
    cy.get('[cy-data=reviews-update-content]').clear()
    cy.get('[cy-data=reviews-update-content]').type("Cool reviews")
    cy.get('[cy-data=reviews-update-score]').clear()
    cy.get('[cy-data=reviews-update-score]').type("5")
    cy.get('[cy-data=reviews-update-game]').select(1)
    cy.get('[cy-data=reviews-update-submit]').click()
    cy.get('[cy-data=reviews-header]').should("have.text","Overzicht van alle reviews")
  });

  it("should show error if error happens", () => {
    cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.mockReviewsGetSpecificResponse()
    cy.mockGamesGetAllResponse()
    cy.mockAdminUserResponse()

    cy.intercept('PUT', backUrl + '/reviews/1', (req) => {
      expect(req.body.content).to.equal("Cool reviews")
      expect(req.body.gameId).to.equal("1")
      expect(req.body.writerId).to.equal("1")
      expect(req.body.score).to.equal(5)
      req.reply(TestResponses.createMockError("Generic Error"))
    });

    cy.get("[cy-data=navbar-reviews-link]", {timeout:1000}).click();
    cy.get('[cy-data=reviews-edit]').eq(0).click()
    cy.get('[cy-data=reviews-update-content]').clear()
    cy.get('[cy-data=reviews-update-content]').type("Cool reviews")
    cy.get('[cy-data=reviews-update-score]').clear()
    cy.get('[cy-data=reviews-update-score]').type("5")
    cy.get('[cy-data=reviews-update-game]').select(1)
    cy.get('[cy-data=reviews-update-submit]').click()
    cy.get('[cy-data=generic-error]').should("be.visible")
    cy.get('[cy-data=error-message]').should("have.text","Generic Error")
  });
});

export { }