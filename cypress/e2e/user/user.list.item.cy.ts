describe("User list item tests", () => {
	it("should be visible if users exist", () => {
		cy.loginAsAdmin()
    cy.mockUsersGetAllResponse()
    cy.get("[cy-data=navbar-user-link]").click();
		cy.get('[cy-data=user-list-item]').should("be.visible")
	});

  it("should have correct data based on mock", () => {
		cy.loginAsAdmin()
    cy.mockUsersGetAllResponse()
    cy.get("[cy-data=navbar-user-link]").click();
		cy.get('[cy-data="user-list-item-name"]').eq(0).should("have.text","admin")
	});
});

export {}