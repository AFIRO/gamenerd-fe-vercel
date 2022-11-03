import config from '../../../src/config.json';
import { TestResponses } from '../test.responses';
const backUrl = config.base_url_backend

describe("Reviews delete tests", () => {
  it("should be visible", () => {
    cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.mockReviewsGetSpecificResponse()
    cy.get("[cy-data=navbar-reviews-link]", {timeout:1000}).click();
    cy.get("[cy-data=reviews-delete]", {timeout:1000}).eq(0).click();
    cy.get('[cy-data=reviews-delete-game]').should("be.visible")
    cy.get('[cy-data=reviews-delete-writer]').should("be.visible")
    cy.get('[cy-data=reviews-delete-submit]').should("be.visible")
    cy.get('[cy-data=reviews-delete-cancel]').should("be.visible")
  });

  it("should cancel if button pressed", () => {
    cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.mockReviewsGetSpecificResponse()
    cy.get("[cy-data=navbar-reviews-link]", {timeout:1000}).click();
    cy.get("[cy-data=reviews-delete]", {timeout:1000}).eq(0).click();
    cy.get('[cy-data=reviews-delete-cancel]').click()
    cy.get('[cy-data=reviews-header]').should("have.text","Overzicht van alle reviews")
  });

  it("should send correct request if submit is pressed", () => {
    cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.mockReviewsGetSpecificResponse()

    cy.intercept('DELETE', backUrl + '/reviews/1', (req) => {
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

    cy.get("[cy-data=navbar-reviews-link]", {timeout:1000}).click();
    cy.get("[cy-data=reviews-delete]", {timeout:1000}).eq(0).click();
    cy.get('[cy-data=reviews-delete-submit]').click()
    cy.get('[cy-data=reviews-header]').should("have.text","Overzicht van alle reviews")
  });

  it("should show error if error happens", () => {
    cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.mockReviewsGetSpecificResponse()

    cy.intercept('DELETE', backUrl + '/reviews/1', (req) => {
      req.reply(TestResponses.createMockError("Generic Error"))
    });

    cy.get("[cy-data=navbar-reviews-link]", {timeout:1000}).click();
    cy.get("[cy-data=reviews-delete]", {timeout:1000}).eq(0).click();
    cy.get('[cy-data=reviews-delete-submit]').click()
    cy.get('[cy-data=generic-error]').should("be.visible")
    cy.get('[cy-data=error-message]').should("have.text","Generic Error")
  });

});

export { }