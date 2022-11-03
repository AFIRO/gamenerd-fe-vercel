import config from '../../../src/config.json';
import { TestResponses } from '../test.responses';
const backUrl = config.base_url_backend

describe("News delete tests", () => {
  it("should be visible", () => {
    cy.loginAsAdmin()
    cy.mockNewsGetAllResponse()
    cy.mockNewsGetSpecificResponse()
    cy.get("[cy-data=navbar-news-link]", {timeout:1000}).click();
    cy.get("[cy-data=news-delete]", {timeout:1000}).eq(0).click();
    cy.get('[cy-data=news-delete-game]').should("be.visible")
    cy.get('[cy-data=news-delete-writer]').should("be.visible")
    cy.get('[cy-data=news-delete-submit]').should("be.visible")
    cy.get('[cy-data=news-delete-cancel]').should("be.visible")
  });

  it("should cancel if button pressed", () => {
    cy.loginAsAdmin()
    cy.mockNewsGetAllResponse()
    cy.mockNewsGetSpecificResponse()
    cy.get("[cy-data=navbar-news-link]", {timeout:1000}).click();
    cy.get("[cy-data=news-delete]", {timeout:1000}).eq(0).click();
    cy.get('[cy-data=news-delete-cancel]').click()
    cy.get('[cy-data=news-header]').should("have.text","Overzicht van alle news")
  });

  it("should send correct request if submit is pressed", () => {
    cy.loginAsAdmin()
    cy.mockNewsGetAllResponse()
    cy.mockNewsGetSpecificResponse()

    cy.intercept('DELETE', backUrl + '/news/1', (req) => {
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

    cy.get("[cy-data=navbar-news-link]", {timeout:1000}).click();
    cy.get("[cy-data=news-delete]", {timeout:1000}).eq(0).click();
    cy.get('[cy-data=news-delete-submit]').click()
    cy.get('[cy-data=news-header]').should("have.text","Overzicht van alle news")
  });

  it("should show error if error happens", () => {
    cy.loginAsAdmin()
    cy.mockNewsGetAllResponse()
    cy.mockNewsGetSpecificResponse()

    cy.intercept('DELETE', backUrl + '/news/1', (req) => {
      req.reply(TestResponses.createMockError("Generic Error"))
    });

    cy.get("[cy-data=navbar-news-link]", {timeout:1000}).click();
    cy.get("[cy-data=news-delete]", {timeout:1000}).eq(0).click();
    cy.get('[cy-data=news-delete-submit]').click()
    cy.get('[cy-data=generic-error]').should("be.visible")
    cy.get('[cy-data=error-message]').should("have.text","Generic Error")
  });

});

export { }