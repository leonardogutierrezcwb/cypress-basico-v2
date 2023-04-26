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
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com email com formatação inválida', function() {
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Dos Santos Gutierrez')
        cy.get('#email').type('leonardogutierrezcwb@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('validação de telefone, só aceitar números', function (){
        cy.get('#phone').type('TESTE').should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Dos Santos Gutierrez')
        cy.get('#email').type('leonardogutierrezcwb@gmail,com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Leonardo').should('have.value', 'Leonardo')
        cy.get('#lastName').type('Dos Santos').should('have.value','Dos Santos')
        cy.get('#email').type('leonardogutierrezcwb@gmail.com').should('have.value', 'leonardogutierrezcwb@gmail.com')
        cy.get('#phone').type('4191234567').should('have.value', '4191234567')
        cy.get('#firstName, #lastName, #email, #phone').clear().should('have.value', '')            
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function (){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('Usando comandos cy.contains', function (){
    
    })
})       