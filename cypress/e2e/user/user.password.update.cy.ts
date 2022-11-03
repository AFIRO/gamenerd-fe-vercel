import config from '../../../src/config.json';
import { TestResponses } from '../test.responses';
const backUrl = config.base_url_backend

describe("User password update tests", () => {
  it("should be visible", () => {
    cy.mockUsersGetAllResponse()
    cy.mockUsersGetSpecificResponse()
    cy.loginAsUser()
    cy.get("[cy-data=navbar-user-dropdown]").click()
    cy.get("[cy-data=navbar-button-change-password]").click()
    cy.get('[cy-data=password-password]').should("be.visible")
    cy.get('[cy-data=password-submit]').should("be.visible")
    cy.get('[cy-data=password-reset]').should("be.visible")
  });

  it("should reset if button pressed", () => {
    cy.mockUsersGetAllResponse()
    cy.mockUsersGetSpecificResponse()
    cy.loginAsUser()
    cy.get("[cy-data=navbar-user-dropdown]").click()
    cy.get("[cy-data=navbar-button-change-password]").click()
    cy.get('[cy-data=password-password]').type("Cool Password")
    cy.get('[cy-data=password-reset]').click()
    cy.get('[cy-data=password-password]').should("not.have.text")
  });

  it("should show error if submit while blank", () => {
    cy.mockUsersGetAllResponse()
    cy.mockUsersGetSpecificResponse()
    cy.loginAsUser()
    cy.get("[cy-data=navbar-user-dropdown]").click()
    cy.get("[cy-data=navbar-button-change-password]").click()
    cy.get('[cy-data=password-password]').clear()
    cy.get('[cy-data=password-submit]').click()
    cy.get('[cy-data=password-error]').should("be.visible")
  });

  it("should send correct request if submit is pressed", () => {
    cy.loginAsUser()
    cy.mockUsersGetSpecificResponse()
    cy.mockUsersGetAllResponse()

    cy.intercept('PUT', backUrl + '/users/password/3', (req) => {
      expect(req.body.id).to.equal("3")
      expect(req.body.password).to.equal("Cool Password")
      req.reply({
        statusCode: 200,
        body: {
          id: "3",
          name: "Cool Guy",
          roles: ["USER"]
        }
      })
    });
    cy.get("[cy-data=navbar-user-dropdown]").click()
    cy.get("[cy-data=navbar-button-change-password]").click()
    cy.get('[cy-data=password-password]').type("Cool Password")
    cy.get('[cy-data=password-submit]').click()
    cy.get('[cy-data=game-list-header]').should("have.text","Overzicht van alle games")
  });

  it("should show error if error returns", () => {
    cy.loginAsUser()
    cy.mockUsersGetSpecificResponse()
    cy.mockUsersGetAllResponse()

    cy.intercept('PUT', backUrl + '/users/password/3', (req) => {
      expect(req.body.id).to.equal("3")
      expect(req.body.password).to.equal("Cool Password")
      req.reply(TestResponses.createMockError("Generic Error"))
    });
    cy.get("[cy-data=navbar-user-dropdown]").click()
    cy.get("[cy-data=navbar-button-change-password]").click()
    cy.get('[cy-data=password-password]').type("Cool Password")
    cy.get('[cy-data=password-submit]').click()
    cy.get('[cy-data=generic-error]').should("be.visible")
    cy.get('[cy-data=error-message]').should("have.text","Generic Error")
  });

});

export { }