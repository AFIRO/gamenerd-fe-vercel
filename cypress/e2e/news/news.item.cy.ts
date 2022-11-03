describe("News item tests", () => {
  it("should be visible if news exist", () => {
		cy.loginAsAdmin()
    cy.mockNewsGetAllResponse()
    cy.mockNewsGetSpecificResponse()
    cy.get("[cy-data=navbar-news-link]").click();
    cy.get('[cy-data=news-list-link]', {timeout: 1000}).eq(0).click()
		cy.get('[cy-data=news-item]').should("be.visible")
    cy.get('[cy-data=news-item-header]').should("be.visible")
    cy.get('[cy-data=news-item-writer]').should("be.visible")
    cy.get('[cy-data=news-item-content]').should("be.visible")
  });
});

export {}