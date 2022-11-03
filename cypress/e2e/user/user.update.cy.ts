import config from '../../../src/config.json';
import { TestResponses } from '../test.responses';
const backUrl = config.base_url_backend

describe("User update tests", () => {
  it("should be visible", () => {
    cy.mockUsersGetAllResponse()
    cy.mockUsersGetSpecificResponse()
    cy.loginAsAdmin()
    cy.get("[cy-data=navbar-user-link]").click();
    cy.get('[cy-data=user-list-edit-button]').eq(2).click()
    cy.get('[cy-data=user-name]').should("be.visible")
    cy.get('[cy-data=user-roles]').should("be.visible")
    cy.get('[cy-data=user-submit]').should("be.visible")
    cy.get('[cy-data=user-reset]').should("be.visible")
  });

  it("should reset if button pressed", () => {
    cy.mockUsersGetAllResponse()
    cy.mockUsersGetSpecificResponse()
    cy.loginAsAdmin()
    cy.get("[cy-data=navbar-user-link]").click();
    cy.get('[cy-data=user-list-edit-button]').eq(2).click()
    cy.get('[cy-data=user-name]').type("username")
    cy.get('[cy-data=user-reset]').click()
    cy.get('[cy-data=user-name]').should("not.have.text")
  });

  it("should show error if submit while blank", () => {
    cy.mockUsersGetAllResponse()
    cy.mockUsersGetSpecificResponse()
    cy.loginAsAdmin()
    cy.get("[cy-data=navbar-user-link]").click();
    cy.get('[cy-data=user-list-edit-button]').eq(2).click()
    cy.get('[cy-data=user-name]').clear()
    cy.get('[cy-data=user-submit]').click()
    cy.get('[cy-data=user-name-error]').should("be.visible")
  });

  it("should send correct request if submit is pressed", () => {
    cy.loginAsAdmin()
    cy.mockUsersGetSpecificResponse()
    cy.mockUsersGetAllResponse()

    cy.intercept('PUT', backUrl + '/users/3', (req) => {
      expect(req.body.id).to.equal("3")
      expect(req.body.name).to.equal("Cool Guy")
      expect(req.body.roles).to.contain("WRITER")
      req.reply({
        statusCode: 200,
        body: {
          id: "3",
          name: "Cool Guy",
          roles: ["USER"]
        }
      })
    });
    cy.get("[cy-data=navbar-user-link]").click();
    cy.get('[cy-data=user-list-edit-button]').eq(2).click()
    cy.get('[cy-data=user-name]').clear()
    cy.get('[cy-data=user-name]').type("Cool Guy")
    cy.get('[cy-data=user-roles]').select("WRITER")
    cy.get('[cy-data=user-submit]').click()
    cy.get('[cy-data=user-list-header]').should("be.visible")
  });

  it("should show error if error returns", () => {
    cy.loginAsAdmin()
    cy.mockUsersGetSpecificResponse()
    cy.mockUsersGetAllResponse()

    cy.intercept('PUT', backUrl + '/users/3', (req) => {
      expect(req.body.id).to.equal("3")
      expect(req.body.name).to.equal("Cool Guy")
      expect(req.body.roles).to.contain("WRITER")
      req.reply(TestResponses.createMockError("Generic Error"))
    });
    cy.get("[cy-data=navbar-user-link]").click();
    cy.get('[cy-data=user-list-edit-button]').eq(2).click()
    cy.get('[cy-data=user-name]').clear()
    cy.get('[cy-data=user-name]').type("Cool Guy")
    cy.get('[cy-data=user-roles]').select("WRITER")
    cy.get('[cy-data=user-submit]').click()
    cy.get('[cy-data=generic-error]').should("be.visible")
    cy.get('[cy-data=error-message]').should("have.text","Generic Error")
  });

});

export { }