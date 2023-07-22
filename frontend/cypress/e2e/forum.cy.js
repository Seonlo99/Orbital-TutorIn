describe('Forum', () => {
    beforeEach(()=>{
      cy.visit('/')
      cy.contains('Sign In')
      cy.findByRole('button', {  name: /sign in/i}).click()
      cy.findByRole('textbox', {name: /username:/i}).type("cypress-test")
      cy.findByLabelText(/password:/i).type("cypress")
      cy.findByRole('button', {name: /submit/i}).click()
    }
    )
  
    it('Forum Page renders with create post, sort and search', () => {
      cy.findByText(/cypress-test/i)
      cy.findByRole('button', {name: /forum/i}).click()
      cy.get('#root > div > div:nth-child(1) > div')
      cy.contains(/Created by/i)

      cy.findByRole('button', {name: /new/i})  //check that the New post button renders
      cy.findByText(/sort/i) //Sort button
      cy.get('#root > div > div:nth-child(1) > div > section:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)') //tag selector
      cy.findByRole('textbox') //Search input box
    })

    it('Create Post', () => {
        cy.findByText(/cypress-test/i)
        cy.findByRole('button', {name: /forum/i}).click()
  
        cy.findByRole('button', {name: /new/i}).click()
        cy.contains(/new post/i)
        cy.findByRole("textbox").type("This is a test post by cypress")
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div').type("test post by cypress")

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)').type("CS2100{enter}")
        cy.findByRole('button', {name: /post/i}).click({force:true})

        cy.contains(/post created/i)
        cy.findByRole('button', {name: /delete/i}).click()
    })

    it('Edit Post', () => {
        cy.findByText(/cypress-test/i)
        cy.findByRole('button', {name: /forum/i}).click()
  
        cy.findByRole('button', {name: /new/i}).click()
        cy.contains(/new post/i)
        cy.findByRole("textbox").type("This is a test post by cypress")
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div').type("test post by cypress")

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)').type("CS2100{enter}")
        cy.findByRole('button', {name: /post/i}).click({force:true})

        cy.contains(/post created/i)
        cy.findByRole('button', {name: /edit/i}).click()
        cy.contains(/edit post/i)
        cy.findByRole('textbox').type(" edited")

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div').type(" edited")

        cy.findByRole('button', {name: /edit/i}).click()
        cy.contains(/This is a test post by cypress edited/i)
        cy.contains(/test post by cypress edited/i)
        
        cy.findByRole('button', {name: /delete/i}).click()
    })

    it('Delete Post', () => {
        cy.findByText(/cypress-test/i)
        cy.findByRole('button', {name: /forum/i}).click()
  
        cy.findByRole('button', {name: /new/i}).click()
        cy.contains(/new post/i)
        cy.findByRole("textbox").type("This is a test post by cypress")
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div').type("test post by cypress")

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)').type("CS2100{enter}")
        cy.findByRole('button', {name: /post/i}).click({force:true})

        cy.contains(/post created/i)

        cy.findByRole('button', {name: /delete/i}).click()

        cy.contains(/post deleted/i)
    })



})