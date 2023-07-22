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

    it('Initial vote count', () => {
        cy.findByText(/cypress-test/i)
        cy.findByRole('button', {name: /forum/i}).click()
  
        cy.findByRole('button', {name: /new/i}).click()
        cy.contains(/new post/i)
        cy.findByRole("textbox").type("This is a test post by cypress")
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div').type("test post by cypress")

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)').type("CS2100{enter}")
        cy.findByRole('button', {name: /post/i}).click({force:true})

        cy.contains(/post created/i)

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3)').contains("0")

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > button > svg').should('have.attr', 'fill', 'currentColor') // upvote
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > button > svg').should('have.attr', 'fill', 'currentColor') // downvote
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1)').findByRole('button', {name: /delete/i}).click()
    })

    it('User upvote post', () => {
        cy.findByText(/cypress-test/i)
        cy.findByRole('button', {name: /forum/i}).click()
  
        cy.findByRole('button', {name: /new/i}).click()
        cy.contains(/new post/i)
        cy.findByRole("textbox").type("This is a test post by cypress")
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div').type("test post by cypress")

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)').type("CS2100{enter}")
        cy.findByRole('button', {name: /post/i}).click({force:true})

        cy.contains(/post created/i)

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3)').contains("0")
        let upvote = cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > button')
        let downvote = cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > button')
        upvote.get('svg').should('have.attr', 'fill', 'currentColor')
        downvote.get('svg').should('have.attr', 'fill', 'currentColor')

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > button').click()

        cy.get('[data-icon="red-upvote"]')
        cy.get('[data-icon="downvote"]')
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3)').contains("1")
        
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1)').findByRole('button', {name: /delete/i}).click()
    })

    it('User downvote post', () => {
        cy.findByText(/cypress-test/i)
        cy.findByRole('button', {name: /forum/i}).click()
  
        cy.findByRole('button', {name: /new/i}).click()
        cy.contains(/new post/i)
        cy.findByRole("textbox").type("This is a test post by cypress")
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div').type("test post by cypress")

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)').type("CS2100{enter}")
        cy.findByRole('button', {name: /post/i}).click({force:true})

        cy.contains(/post created/i)

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3)').contains("0")
        let upvote = cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > button')
        let downvote = cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > button')
        upvote.get('svg').should('have.attr', 'fill', 'currentColor')
        downvote.get('svg').should('have.attr', 'fill', 'currentColor')

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > button').click()

        cy.get('[data-icon="upvote"]')
        cy.get('[data-icon="blue-downvote"]')
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3)').contains("-1")
        
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1)').findByRole('button', {name: /delete/i}).click()
    })

    it('User downvote then upvote post', () => {
        cy.findByText(/cypress-test/i)
        cy.findByRole('button', {name: /forum/i}).click()
  
        cy.findByRole('button', {name: /new/i}).click()
        cy.contains(/new post/i)
        cy.findByRole("textbox").type("This is a test post by cypress")
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div').type("test post by cypress")

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)').type("CS2100{enter}")
        cy.findByRole('button', {name: /post/i}).click({force:true})

        cy.contains(/post created/i)

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3)').contains("0")
        let upvote = cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > button')
        let downvote = cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > button')
        upvote.get('svg').should('have.attr', 'fill', 'currentColor')
        downvote.get('svg').should('have.attr', 'fill', 'currentColor')

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > button').click()

        cy.get('[data-icon="upvote"]')
        cy.get('[data-icon="blue-downvote"]')
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3)').contains("-1")

        cy.get('[data-icon="upvote"]').click()
        cy.get('[data-icon="red-upvote"]')
        cy.get('[data-icon="downvote"]')
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3)').contains("1")

        
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1)').findByRole('button', {name: /delete/i}).click()
    })

    it('User upvote then downvote post', () => {
        cy.findByText(/cypress-test/i)
        cy.findByRole('button', {name: /forum/i}).click()
  
        cy.findByRole('button', {name: /new/i}).click()
        cy.contains(/new post/i)
        cy.findByRole("textbox").type("This is a test post by cypress")
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div').type("test post by cypress")

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)').type("CS2100{enter}")
        cy.findByRole('button', {name: /post/i}).click({force:true})

        cy.contains(/post created/i)

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3)').contains("0")
        let upvote = cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > button')
        let downvote = cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > button')
        upvote.get('svg').should('have.attr', 'fill', 'currentColor')
        downvote.get('svg').should('have.attr', 'fill', 'currentColor')

        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > button').click()

        cy.get('[data-icon="red-upvote"]')
        cy.get('[data-icon="downvote"]')
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3)').contains("1")

        cy.get('[data-icon="downvote"]').click()
        cy.get('[data-icon="upvote"]')
        cy.get('[data-icon="blue-downvote"]')
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3)').contains("-1")

        
        cy.get('#root > div > div:nth-child(1) > div > div:nth-child(1)').findByRole('button', {name: /delete/i}).click()
    })

})