describe("reviews list item tests", () => {
	it("should be visible if reviews exist", () => {
		cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.get("[cy-data=navbar-reviews-link]",{timeout:1000}).click();
		cy.get('[cy-data=reviews-list-name]').should("be.visible")
    cy.get('[cy-data=reviews-list-writer]').should("be.visible")
    cy.get('[cy-data=reviews-list-content]').should("be.visible")
    cy.get('[cy-data=reviews-list-score]').should("be.visible")
    cy.get('[cy-data=reviews-list-link]').should("be.visible")
    
	});

  it("should have correct data based on mock", () => {
		cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.get("[cy-data=navbar-reviews-link]").click();
		cy.get('[cy-data=reviews-list-name]').eq(0).should("have.text","Metal Gear Rising: Revengeance")
    cy.get('[cy-data=reviews-list-writer]').eq(0).should("have.text","admin")
    cy.get('[cy-data=reviews-list-content]').eq(0).should("have.text","Tweede poging...")
    cy.get('[cy-data=reviews-list-score]').eq(0).should("have.text","5/10")
	});

  it("render correct unprotected buttons", () => {
		cy.loginAsUser()
    cy.mockReviewsGetAllResponse()
    cy.get("[cy-data=navbar-reviews-link]").click();
		cy.get('[cy-data=reviews-list-link]').should("be.visible")
	});

  it("As admin, should render protected buttons", () => {
		cy.loginAsAdmin()
    cy.mockReviewsGetAllResponse()
    cy.get("[cy-data=navbar-reviews-link]").click();
		cy.get('[cy-data="reviews-delete"]').should("be.visible")
	});

  it("As writer, should render protected buttons", () => {
		cy.loginAsWriter()
    cy.mockReviewsGetAllResponse()
    cy.get("[cy-data=navbar-reviews-link]").click();
    cy.get('[cy-data="reviews-edit"]').should("be.visible")
		cy.get('[cy-data="reviews-delete"]').should("not.exist")
	});

  it("As user, should not render protected buttons", () => {
		cy.loginAsUser()
    cy.mockReviewsGetAllResponse()
    cy.get("[cy-data=navbar-reviews-link]").click();
    cy.get('[cy-data="reviews-edit"]').should("not.exist")
		cy.get('[cy-data="reviews-delete"]').should("not.exist")
	});
});

export {}