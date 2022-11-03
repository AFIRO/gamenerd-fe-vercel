describe("Review item tests", () => {
  it("should be visible if review exist", () => {
		cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.mockReviewsGetSpecificResponse()
    cy.get("[cy-data=navbar-reviews-link]").click();
    cy.get('[cy-data=reviews-list-link]', {timeout: 1000}).eq(0).click()
		cy.get('[cy-data=reviews-item]').should("be.visible")
    cy.get('[cy-data=reviews-item-header]').should("be.visible")
    cy.get('[cy-data=reviews-item-writer]').should("be.visible")
    cy.get('[cy-data=reviews-item-content]').should("be.visible")
  });
});

export {}