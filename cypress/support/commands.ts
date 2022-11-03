/// <reference types="cypress" />
import config from '../../src/config.json';
import { TestResponses } from "../e2e/test.responses";

const frontUrl = config.base_url_frontend
const backUrl = config.base_url_backend

Cypress.Commands.add('login', (username:string,password:string) => {
  cy.visit(frontUrl+'/login')
  cy.get('[cy-data=username-input]').type(username);
  cy.get('[cy-data=password-input]').type(password);
  cy.get('[cy-data=submit-input]').click();
})

Cypress.Commands.add('loginAsAdmin', () => {
  cy.intercept('POST', backUrl +'/login', TestResponses.LOGIN_RESPONSE_ADMIN)
  cy.intercept('GET',backUrl + "/games", TestResponses.GAMES_ALL_RESPONSE)
  cy.visit(frontUrl+'/login')
  cy.get('[cy-data=username-input]').type("admin");
  cy.get('[cy-data=password-input]').type("admin");
  cy.get('[cy-data=submit-input]').click();
})

Cypress.Commands.add('loginAsWriter', () => {
  cy.intercept('POST', backUrl +'/login', TestResponses.LOGIN_RESPONSE_WRITER)
  cy.intercept('GET',backUrl + "/games", TestResponses.GAMES_ALL_RESPONSE)
  cy.visit(frontUrl+'/login')
  cy.get('[cy-data=username-input]').type("writer");
  cy.get('[cy-data=password-input]').type("writer");
  cy.get('[cy-data=submit-input]').click();
})

Cypress.Commands.add('loginAsUser', () => {
  cy.intercept('POST', backUrl +'/login', TestResponses.LOGIN_RESPONSE_USER)
  cy.intercept('GET',backUrl + "/games", TestResponses.GAMES_ALL_RESPONSE)
  cy.visit(frontUrl+'/login')
  cy.get('[cy-data=username-input]').type("user");
  cy.get('[cy-data=password-input]').type("user");
  cy.get('[cy-data=submit-input]').click();
})

Cypress.Commands.add('register', (username: string, password: string) => {
  cy.visit(frontUrl+'/register')
  cy.get('[cy-data=username-input]').type(username);
  cy.get('[cy-data=password-input]').type(password);
  cy.get('[cy-data=submit-input]').click();
})

Cypress.Commands.add('mockLoginResponseAdmin', () => {
  cy.intercept('POST', backUrl +'/login', TestResponses.LOGIN_RESPONSE_ADMIN)
})

Cypress.Commands.add('mockLoginResponseWriter', () => {
  cy.intercept('POST', backUrl +'/login', TestResponses.LOGIN_RESPONSE_WRITER)
})

Cypress.Commands.add('mockLoginResponseUser', () => {
  cy.intercept('POST', backUrl +'/login', TestResponses.LOGIN_RESPONSE_USER)
})

Cypress.Commands.add('mockRegisterResponse', () => {
  cy.intercept('POST', backUrl +'/register', TestResponses.LOGIN_RESPONSE_ADMIN)
})

Cypress.Commands.add('mockGamesGetAllResponse', () => {
  cy.intercept('GET',backUrl + "/games", TestResponses.GAMES_ALL_RESPONSE )
})

Cypress.Commands.add('mockGamesGetSpecificResponse', () => {
  cy.intercept('GET',backUrl + "/games/1", TestResponses.GAME_RESPONSE )
})

Cypress.Commands.add('mockUsersGetAllResponse', () => {
  cy.intercept('GET',backUrl + "/users", TestResponses.USERS_ALL_RESPONSE )
})

Cypress.Commands.add('mockUsersGetSpecificResponse', () => {
  cy.intercept('GET',backUrl + "/users/roles/3", TestResponses.USER_RESPONSE )
})

Cypress.Commands.add('mockAdminUserResponse', () => {
  cy.intercept('GET',backUrl + "/users/roles/3", TestResponses.USER_RESPONSE )
})

Cypress.Commands.add('mockAdminUserNoRolesResponse', () => {
  cy.intercept('GET',backUrl + "/users/3", TestResponses.USER_RESPONSE )
})



Cypress.Commands.add('mockNewsGetAllResponse', () => {
  cy.intercept('GET',backUrl + "/news", TestResponses.NEWS_ALL_RESPONSE )
})

Cypress.Commands.add('mockNewsGetSpecificResponse', () => {
  cy.intercept('GET',backUrl + "/news/1", TestResponses.NEWS_RESPONSE )
})

Cypress.Commands.add('mockReviewsGetAllResponse', () => {
  cy.intercept('GET',backUrl + "/reviews", TestResponses.REVIEWS_ALL_RESPONSE )
})

Cypress.Commands.add('mockReviewsGetSpecificResponse', () => {
  cy.intercept('GET',backUrl + "/reviews/1", TestResponses.REVIEW_RESPONSE )
})

Cypress.Commands.add('mockNewsByWriterResponse', () => {
  cy.intercept('GET',backUrl + "/news/byWriter/3", TestResponses.NEWS_ALL_RESPONSE )
})

Cypress.Commands.add('mockNewsByGameResponse', () => {
  cy.intercept('GET',backUrl + "/news/byGame/1", TestResponses.NEWS_ALL_RESPONSE )
})

Cypress.Commands.add('mockReviewsByWriterResponse', () => {
  cy.intercept('GET',backUrl + "/reviews/byWriter/3", TestResponses.REVIEWS_ALL_RESPONSE )
})

Cypress.Commands.add('mockReviewsByGameResponse', () => {
  cy.intercept('GET',backUrl + "/reviews/byGame/1", TestResponses.REVIEWS_ALL_RESPONSE )
})


declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>,
      loginAsAdmin(): Chainable<void>,
      loginAsWriter(): Chainable<void>,
      loginAsUser(): Chainable<void>,
      register(username: string, password: string): Chainable<void>
      mockLoginResponseAdmin(): Chainable<void>
      mockLoginResponseWriter(): Chainable<void>
      mockLoginResponseUser(): Chainable<void>
      mockRegisterResponse(): Chainable<void>
      mockGamesGetAllResponse(): Chainable<void>
      mockGamesGetSpecificResponse(): Chainable<void>
      mockUsersGetAllResponse(): Chainable<void>
      mockUsersGetSpecificResponse(): Chainable<void>
      mockAdminUserResponse(): Chainable<void>
      mockNewsGetAllResponse(): Chainable<void>
      mockNewsGetSpecificResponse(): Chainable<void>
      mockReviewsGetAllResponse(): Chainable<void>
      mockReviewsGetSpecificResponse(): Chainable<void>
      mockNewsByWriterResponse(): Chainable<void>
      mockNewsByGameResponse(): Chainable<void>
      mockReviewsByWriterResponse(): Chainable<void>
      mockReviewsByGameResponse(): Chainable<void>
      mockAdminUserNoRolesResponse(): Chainable<void>
    }
  }
}
export { }