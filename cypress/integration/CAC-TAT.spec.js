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
        cy.contains('button', 'Enviar')
        .click()
        cy.get('.success')
        .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com email com formatação inválida', function() {
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Dos Santos Gutierrez')
        cy.get('#email').type('leonardogutierrezcwb@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar')
        .click()
        cy.get('.error')
        .should('be.visible')
    })

    it('validação de telefone, só aceitar números', function (){
        cy.get('#phone').type('TESTE').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Dos Santos Gutierrez')
        cy.get('#email').type('leonardogutierrezcwb@gmail,com')
        cy.get('#phone-checkbox')
        .click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar')
        .click()
        cy.get('.error')
        .should('be.visible')
    })
    
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Leonardo')
        .should('have.value', 'Leonardo')
        cy.get('#lastName').type('Dos Santos')
        .should('have.value','Dos Santos')
        cy.get('#email').type('leonardogutierrezcwb@gmail.com')
        .should('have.value', 'leonardogutierrezcwb@gmail.com')
        cy.get('#phone').type('4191234567')
        .should('have.value', '4191234567')
        cy.get('#firstName, #lastName, #email, #phone')
        .clear()
        .should('have.value', '')            
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function (){
        cy.get('button[type="submit"]')
        .click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success')
        .should('be.visible')
    })

    it('Usando comandos cy.contains', function (){
    })

    it('seleciona um produto (YouTube) por seu texto', function (){
        cy.get('#product').select('YouTube') //Seleção pelo texto
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria') //Seleção pelo value
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function (){
        cy.get('select').select(1) //Seleção pelo índice 1
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function ($radio){
            cy.wrap($radio)
            .check()
            cy.wrap($radio)
            .should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        //cy.get('input[type="checkbox"][value="phone"]')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Dos Santos Gutierrez')
        cy.get('#email').type('leonardogutierrezcwb@gmail,com')
        cy.get('#phone-checkbox')
        .check()
        .should('be.checked')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar')
        .click()
        cy.get('.error')
        .should('be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')  
        })
    })        
        it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')  
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function (){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')  
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function (){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()
        cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT').should('be.visible')
    })
   
})