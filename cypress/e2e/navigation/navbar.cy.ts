import config from '../../../src/config.json';
const baseUrl = config.base_url_frontend
describe("Navbar tests", () => {
	it("should show login and register when not logged on", () => {
    cy.visit(baseUrl)
		cy.get("[cy-data=navbar-user-link]").should("not.exist")
    cy.get("[cy-data=navbar-user-dropdown]").click()
    cy.get("[cy-data=navbar-button-login]").should("be.visible")
    cy.get("[cy-data=navbar-button-register]").should("be.visible")
	});

  it("When logged as admin. Should show user link, logged user and logout button. Should not show register and login.", () => {
    cy.loginAsAdmin()
		cy.get("[cy-data=navbar-user-link]").should("be.visible")
    cy.get("[cy-data=navbar-user-dropdown]").click()
    cy.get("[cy-data=navbar-user-name]").should("have.text","Current user: admin")
    cy.get("[cy-data=navbar-button-login]").should("not.exist")
    cy.get("[cy-data=navbar-button-register]").should("not.exist")
    cy.get("[cy-data=navbar-button-change-password]").should("be.visible")
    cy.get("[cy-data=navbar-button-logout]").should("be.visible")
	});

  it("When logged as user. Should show, logged user and logout button. Should not show user link, register and login.", () => {
    cy.loginAsUser()
    cy.get("[cy-data=navbar-user-dropdown]").click()
    cy.get("[cy-data=navbar-user-name]").should("have.text","Current user: user")
    cy.get("[cy-data=navbar-button-login]").should("not.exist")
    cy.get("[cy-data=navbar-button-login]").should("not.exist")
    cy.get("[cy-data=navbar-button-register]").should("not.exist")
    cy.get("[cy-data=navbar-button-logout]").should("be.visible")
	});
});

export {}