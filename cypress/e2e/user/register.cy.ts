import { TestResponses } from "../test.responses";
import config from '../../../src/config.json';
const baseUrl = config.base_url_frontend
const backUrl = config.base_url_backend

describe("Register screen tests", () => {
	it("should register with correct credentials", () => {
		cy.mockRegisterResponse()
		cy.mockGamesGetAllResponse()
		cy.register("newuser","newuser")
		cy.get("h1").should("have.text",'Overzicht van alle games')
	});

	it("should not register with known user", () => {
		cy.intercept(backUrl+"/register", TestResponses.createMockError("User already exists")) 
		cy.register("admin","admin")
		cy.get('[cy-data=error-message]').should("have.text",'"User already exists"')
	});

	it("should reset fields when hitting reset", () => {
		cy.visit(baseUrl + '/register')
		cy.get('[cy-data=username-input]').type("admin2");
		cy.get('[cy-data=password-input]').type("admin2");
		cy.get('[cy-data=reset-input]').click();
		cy.get('[cy-data=username-input]').should("not.have.text");
		cy.get('[cy-data=password-input]').should("not.have.text");
	});

	it("should show error when submit with blank data", () => {
		cy.visit(baseUrl + '/register')
		cy.get('[cy-data=submit-input]').click();
		cy.get('[cy-data=error-username]').should("be.visible")
		cy.get('[cy-data=error-password]').should("be.visible")
	});
});

export {}