describe("Profile", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Sign In");
    cy.findByRole("button", { name: /sign in/i }).click();
    cy.findByRole("textbox", { name: /username:/i }).type("cypress-test");
    cy.findByLabelText(/password:/i).type("cypress");
    cy.findByRole("button", { name: /submit/i }).click();
  });

  it("Start conversation with another user", () => {
    cy.findByText(/cypress-test/i);

    cy.findByText(/javier tan/i).click();
    cy.findByRole("button", { name: /chat now/i }).click();
    cy.get(
      "#root > div > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(3) > div"
    ).click();
  });
  it("Delete a conversation", () => {
    cy.findByText(/cypress-test/i);
    cy.findByRole("button", { name: /chat/i }).click();
    cy.get(
      "#root > div > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(3) > div > svg"
    ).click();
  });
});
