///<reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function (){
        const longText = 'Inserindo textos muito extensos no campo de digitação para que o conteúdo fique extenso. Inserindo textos muito extensos no campo de digitação para que o conteúdo fique extenso Inserindo textos muito extensos no campo de digitação para que o conteúdo fique extenso. Inserindo textos muito extensos no campo de digitação para que o conteúdo fique extenso. '
        
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Dos Santos Gutierrez')
        cy.get('#email').type('leonardogutierrezcwb@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })
        it.only('exibe mensagem de erro ao submeter o formulário com email com formatação inválida', function() {
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Dos Santos Gutierrez')
        cy.get('#email').type('leonardogutierrezcwb@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible') //COMENTÁRIO DE TESTE
    })
})       