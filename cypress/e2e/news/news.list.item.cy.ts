describe("News list item tests", () => {
	it("should be visible if news exist", () => {
		cy.loginAsAdmin()
    cy.mockNewsGetAllResponse()
    cy.get("[cy-data=navbar-news-link]").click();
		cy.get('[cy-data=news-list-name]').should("be.visible")
    cy.get('[cy-data=news-list-writer]').should("be.visible")
    cy.get('[cy-data=news-list-content]').should("be.visible")
    cy.get('[cy-data=news-list-link]').should("be.visible")
	});

  it("should have correct data based on mock", () => {
		cy.loginAsAdmin()
    cy.mockNewsGetAllResponse()
    cy.get("[cy-data=navbar-news-link]").click();
		cy.get('[cy-data=news-list-name]').eq(0).should("have.text","Devil May Cry 3: Dante's Awakening")
    cy.get('[cy-data=news-list-writer]').eq(0).should("have.text","admin")
    cy.get('[cy-data=news-list-content]').eq(0).should("have.text","Dante is cool e...")
	});

  it("render correct unprotected buttons", () => {
		cy.loginAsUser()
    cy.mockNewsGetAllResponse()
    cy.get("[cy-data=navbar-news-link]").click();
		cy.get('[cy-data=news-list-link]').should("be.visible")
	});

  it("As admin, should render protected buttons", () => {
		cy.loginAsAdmin()
    cy.mockNewsGetAllResponse()
    cy.get("[cy-data=navbar-news-link]").click();
		cy.get('[cy-data="news-delete"]').should("be.visible")
	});

  it("As writer, should render protected buttons", () => {
		cy.loginAsWriter()
    cy.mockNewsGetAllResponse()
    cy.get("[cy-data=navbar-news-link]").click();
    cy.get('[cy-data="news-edit"]').should("be.visible")
		cy.get('[cy-data="news-delete"]').should("not.exist")
	});

  it("As user, should not render protected buttons", () => {
		cy.loginAsUser()
    cy.mockNewsGetAllResponse()
    cy.get("[cy-data=navbar-news-link]").click();
    cy.get('[cy-data="news-edit"]').should("not.exist")
		cy.get('[cy-data="news-delete"]').should("not.exist")
	});
});

export {}