describe("Profile", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Sign In");
    cy.findByRole("button", { name: /sign in/i }).click();
    cy.findByRole("textbox", { name: /username:/i }).type("cypress-test");
    cy.findByLabelText(/password:/i).type("cypress");
    cy.findByRole("button", { name: /submit/i }).click();

    // nav to profile
    cy.findByText(/cypress-test/i);
    cy.findByRole("img", {
      name: /user dropdown/i,
    }).realHover("mouse");

    cy.findByRole("button", {
      name: /View Profile/i,
    }).click();
  });

  it("Profile Page renders with aboutMe, CommunityStats, Recent posts and comments, reviews", () => {
    cy.findByText(/cypress tester/i);
    cy.findByText(/community stats/i);
    cy.findByText(/recent posts/i);
    cy.findByText(/recent posts/i);
    cy.findByText(/recent posts/i);
  });

  it("Engage and Chat button should not be rendered", () => {
    cy.findByRole("button", { name: /engage tutor/i }).should("not.exist");
    cy.findByRole("button", { name: /chat now/i }).should("not.exist");
  });

  it("Edit profile", () => {
    const oldName = "cypress tester";
    const oldBio = " ";
    const oldEmail = "cypress@cypress.com";
    const newName = "cypress tester name change test";
    const newBio = "test bio test";
    const newEmail = "cypress@cypressemailtest.com";

    cy.findByRole("button", { name: /edit profile/i }).click();
    cy.findByRole("textbox", { name: /full name:/i })
      .clear()
      .type(newName);
    cy.findByRole("textbox", { name: /profile bio:/i })
      .clear()
      .type(newBio);
    cy.findByRole("textbox", { name: /email:/i })
      .clear()
      .type(newEmail);
    cy.findByRole("button", { name: /update/i }).click();

    // verify changes
    cy.findByRole("img", {
      name: /user dropdown/i,
    }).realHover("mouse");

    cy.findByRole("button", {
      name: /View Profile/i,
    }).click();
    cy.findByText(/cypress tester name change test/i);
    cy.findByText(/test bio test/i);
    cy.findByText(/cypress@cypressemailtest.com/i);

    //change back
    cy.findByRole("button", { name: /edit profile/i }).click();
    cy.findByRole("textbox", { name: /full name:/i })
      .clear()
      .type(oldName);
    cy.findByRole("textbox", { name: /profile bio:/i })
      .clear()
      .type(oldBio);
    cy.findByRole("textbox", { name: /email:/i })
      .clear()
      .type(oldEmail);
    cy.findByRole("button", { name: /update/i }).click();
  });
});
