describe('Comment', () => {
    beforeEach(()=>{
      cy.visit('/')
      cy.contains('Sign In')
      cy.findByRole('button', {  name: /sign in/i}).click()
      cy.findByRole('textbox', {name: /username:/i}).type("cypress-test")
      cy.findByLabelText(/password:/i).type("cypress")
      cy.findByRole('button', {name: /submit/i}).click()
    }
    )

    it('Create Comment', () => {
        cy.findByText(/cypress-test/i)
        cy.findByRole('button', {name: /forum/i}).click()
  
        cy.findByRole('button', {name: /new/i}).click()
        cy.contains(/new post/i)
        cy.findByRole("textbox").type("This is a test post by cypress")
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div').type("test post by cypress")

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)').type("CS2100{enter}")
        cy.findByRole('button', {name: /post/i}).click({force:true})

        cy.contains(/post created/i)

        cy.findByRole('textbox').type("cypress test comment")
        cy.findByRole('button', {name: /comment/i}).click()

        cy.contains(/comments \(1\):/i)

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(3) > div:nth-child(2) > div').contains(/cypress test comment/i)

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1)').findByRole('button', {name: /delete/i}).click()
    })

    it('Edit Comment', () => {
        cy.findByText(/cypress-test/i)
        cy.findByRole('button', {name: /forum/i}).click()
  
        cy.findByRole('button', {name: /new/i}).click()
        cy.contains(/new post/i)
        cy.findByRole("textbox").type("This is a test post by cypress")
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div').type("test post by cypress")

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)').type("CS2100{enter}")
        cy.findByRole('button', {name: /post/i}).click({force:true})

        cy.contains(/post created/i)

        cy.findByRole('textbox').type("cypress test comment")
        cy.findByRole('button', {name: /comment/i}).click()

        cy.contains(/comments \(1\):/i)

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(3) > div:nth-child(2) > div').contains(/cypress test comment/i)

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(3) > div:nth-child(2) > div').findByRole('button', {name: /edit/i}).click()
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(3) > div:nth-child(2) > div > div:nth-child(3) > form > div').type(" edited")
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(3) > div:nth-child(2) > div > div:nth-child(3) > form > div').findByRole('button', {name: /edit/i}).click()

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(3) > div:nth-child(2) > div').contains(/cypress test comment edited/i)
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1)').findByRole('button', {name: /delete/i}).click()
    })

    it('Delete Comment', () => {
        cy.findByText(/cypress-test/i)
        cy.findByRole('button', {name: /forum/i}).click()
  
        cy.findByRole('button', {name: /new/i}).click()
        cy.contains(/new post/i)
        cy.findByRole("textbox").type("This is a test post by cypress")
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div').type("test post by cypress")

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)').type("CS2100{enter}")
        cy.findByRole('button', {name: /post/i}).click({force:true})

        cy.contains(/post created/i)

        cy.findByRole('textbox').type("cypress test comment")
        cy.findByRole('button', {name: /comment/i}).click()

        cy.contains(/comments \(1\):/i)

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(3) > div:nth-child(2) > div').contains(/cypress test comment/i)
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(3) > div:nth-child(2) > div').findByRole('button', {name: /delete/i}).click()

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(3) > div:nth-child(2) > div').contains(/deleted message/i)

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1)').findByRole('button', {name: /delete/i}).click()
    })


})