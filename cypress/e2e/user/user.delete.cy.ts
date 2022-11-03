import config from '../../../src/config.json';
import { TestResponses } from '../test.responses';
const backUrl = config.base_url_backend

describe("User delete tests", () => {
  it("should be visible", () => {
    cy.mockUsersGetAllResponse()
    cy.mockUsersGetSpecificResponse()
    cy.loginAsAdmin()
    cy.get("[cy-data=navbar-user-link]").click();
    cy.get('[cy-data=user-list-delete-button]').eq(1).click()
    cy.get('[cy-data=delete-naam]').should("be.visible")
    cy.get('[cy-data=delete-opmerking]').should("be.visible")
    cy.get('[cy-data=delete-submit]').should("be.visible")
    cy.get('[cy-data=delete-cancel]').should("be.visible")
  });

  it("should cancel if button pressed", () => {
    cy.mockUsersGetAllResponse()
    cy.mockUsersGetSpecificResponse()
    cy.loginAsAdmin()
    cy.get("[cy-data=navbar-user-link]").click();
    cy.get('[cy-data=user-list-delete-button]').eq(1).click()
    cy.get('[cy-data=delete-cancel]').click()
    cy.get('[cy-data=user-list-header]').should("be.visible")
  });

  it("should send correct request if submit is pressed", () => {
    cy.mockUsersGetAllResponse()
    cy.loginAsAdmin()
    cy.mockUsersGetSpecificResponse()

    cy.intercept('DELETE', backUrl + '/users/3', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          id: "3",
          name: "Cool user",
          roles: ["USER"]
        }
      })
    });
    cy.get("[cy-data=navbar-user-link]").click();
    cy.get('[cy-data=user-list-delete-button]').eq(1).click()
    cy.get('[cy-data=delete-submit]').click()
    cy.get('[cy-data=user-list-header]').should("be.visible")
  });

  it("should show error if error happens", () => {
    cy.mockUsersGetAllResponse()
    cy.loginAsAdmin()
    cy.mockUsersGetSpecificResponse()

    cy.intercept('DELETE', backUrl + '/users/3', (req) => {
      req.reply(TestResponses.createMockError("Generic Error"))
    });
    cy.get("[cy-data=navbar-user-link]").click();
    cy.get('[cy-data=user-list-delete-button]').eq(1).click()
    cy.get('[cy-data=delete-submit]').click()
    cy.get('[cy-data=generic-error]').should("be.visible")
    cy.get('[cy-data=error-message]').should("have.text","Generic Error")
  });

});

export { }