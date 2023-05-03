///<reference types="Cypress" />

const { functionsIn } = require("cypress/types/lodash")

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000

    this.beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function (){
        const longText = 'Inserindo textos muito extensos no campo de digitação para que o conteúdo fique extenso. Inserindo textos muito extensos no campo de digitação para que o conteúdo fique extenso Inserindo textos muito extensos no campo de digitação para que o conteúdo fique extenso. Inserindo textos muito extensos no campo de digitação para que o conteúdo fique extenso. '
        cy.clock()

        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Dos Santos Gutierrez')
        cy.get('#email').type('leonardogutierrezcwb@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })
    
    it('Exibe mensagem de erro ao submeter o formulário com email com formatação inválida', function() {
        
        cy.clock()
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Dos Santos Gutierrez')
        cy.get('#email').type('leonardogutierrezcwb@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('Validação de telefone, só aceitar números', function (){
        cy.get('#phone').type('TESTE').should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.clock()
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Dos Santos Gutierrez')
        cy.get('#email').type('leonardogutierrezcwb@gmail,com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })
    
    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Leonardo')
        .should('have.value', 'Leonardo')
        cy.get('#lastName').type('Dos Santos')
        .should('have.value','Dos Santos')
        cy.get('#email').type('leonardogutierrezcwb@gmail.com')
        .should('have.value', 'leonardogutierrezcwb@gmail.com')
        cy.get('#phone').type('4191234567').should('have.value', '4191234567')
        cy.get('#firstName, #lastName, #email, #phone')
        .clear()
        .should('have.value', '')            
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function (){
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('Envia o formulário com sucesso usando um comando customizado', function(){
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success')
        .should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('Usando comandos cy.contains', function (){
    })

    it('Seleciona um produto (YouTube) por seu texto', function (){
        cy.get('#product').select('YouTube') //Seleção pelo texto
        .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria') //Seleção pelo value
        .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice', function (){
        cy.get('select').select(1) //Seleção pelo índice 1
        .should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function ($radio){
            cy.wrap($radio)
            .check()
            cy.wrap($radio)
            .should('be.checked')
        })
    })

    it('Marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        //cy.get('input[type="checkbox"][value="phone"]')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
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

    it('Seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')  
        })
    })        
        it('Seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')  
        })
    })
    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function (){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')  
        })
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function (){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    
    })
    it('Acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()
        cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT').should('be.visible')
    })
    
    it('Exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })
    it('Preenche a area de texto usando o comando invoke', function () {
       const longText = Cypress._.repeat('1235 |', 40)        
       cy.get('#open-text-area')
       .invoke('val', longText)
       .should('have.value', longText)
    })      
    it.only('Faz uma requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) {
            const { status, statusText, body } = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT') 
        })
    })
    it('Encontrando o gato escondido', function(){
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')
    })
})