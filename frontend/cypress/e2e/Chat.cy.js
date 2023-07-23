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

  it("Send message to another user", () => {
    cy.findByText(/javier tan/i).click();
    cy.findByRole("button", { name: /chat now/i }).click();
    cy.get(
      "#root > div > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(3) > div"
    ).click();
    cy.get("textarea").type("sent message 1");
    cy.findByRole("button", { name: /send/i }).click();
    cy.get("textarea").type("sent message 2");
    cy.findByRole("button", { name: /send/i }).click();

    cy.findByRole("img", {
      name: /user dropdown/i,
    }).realHover("mouse");
    cy.findByRole("button", {
      name: /Logout/i,
    }).click();
    cy.contains("Sign In");
    cy.findByRole("button", { name: /sign in/i }).click();
    cy.findByRole("textbox", { name: /username:/i }).type("JavierTan");
    cy.findByLabelText(/password:/i).type("qwer1234");
    cy.findByRole("button", { name: /submit/i }).click();
    cy.findByRole("button", { name: /chat/i }).click();
    cy.get(
      "#root > div > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(3) > div"
    ).click();
    cy.findByText(/sent message 1/i);
    cy.findByText(/sent message 2/i);

    cy.get(
      "#root > div > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(3) > div > svg"
    ).click();
  });

  it("Not able to send message once conversation is deleted", () => {
    cy.findByText(/javier tan/i).click();
    cy.findByRole("button", { name: /chat now/i }).click();
    cy.get(
      "#root > div > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(3) > div"
    ).click();
    cy.findByRole("button", { name: /send/i });
    cy.get(
      "#root > div > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(3) > div > svg"
    ).click();
    cy.findByRole("button", { name: /send/i }).should("not.exist");
  });
});
