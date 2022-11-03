describe("User list tests", () => {
	it("should be visible if users exist", () => {
		cy.mockUsersGetAllResponse()
		cy.loginAsAdmin()
		cy.get("[cy-data=navbar-user-link]").click();
		cy.get('[cy-data=user-list-header]').should("be.visible")
		cy.get('[cy-data=user-list]').should("be.visible")
		cy.get('[cy-data=user-create]').should("be.visible")      
	});
});

export {}