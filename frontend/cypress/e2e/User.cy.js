describe('User Registration and Login', () => {
  beforeEach(()=>{
    cy.visit('/')
    cy.contains('Sign In')
    cy.findByRole('button', {  name: /sign in/i}).click()
    cy.findByRole('textbox', {name: /username:/i}).type("cypress-test")
    cy.findByLabelText(/password:/i).type("cypress")
    cy.findByRole('button', {name: /submit/i}).click()
  }
  )

  it('Log in Successful', () => {
    cy.findByText(/cypress-test/i)
  })

  it('Register Success', () => {
    cy.visit('/')
    cy.contains('Sign In')
    cy.findByRole('button', {  name: /sign in/i}).click()
    cy.findByText(/register now/i).click()
    let num = Math.floor(100000 + Math.random() * 900000);
    let name = "cypress" + num
    cy.findByPlaceholderText(/Enter Username/i).type(name)
    cy.findByPlaceholderText(/Enter Name/i).type(name)
    cy.findByPlaceholderText(/Enter email/i).type(name+"@email.com")
    cy.findByTestId("RegisterPassword").type(name)
    cy.findByTestId("RegisterCfmPassword").type(name)
    cy.findByRole('button', {name: /submit/i}).click()
    cy.findByText(name)
  })
})