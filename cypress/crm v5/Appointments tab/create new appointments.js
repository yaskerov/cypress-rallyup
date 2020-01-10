const userName = 'Biba Ahmetov';
const searchToUser = 'biba';


describe("User can navigate homepage", () => {
    before(() => {
        cy.loggedInAs();
    });
    it('finds clients"', function() {
    //go to Appointments tab
    cy.get('[routerlink="/appointments"] > .mat-button-wrapper > .mat-icon').click();

    //go to Scheduled tab
    cy.get(':nth-child(2) > .tab-item-container > span').click();

    //create new Appointments
    cy.get('.grid-plus-button > .mat-button-wrapper > .material-icons').click();
    
    //Select Service Type 
    cy.get('#mat-select-5 > .mat-select-trigger > .mat-select-value > .mat-select-placeholder').click();
    cy.get('.mat-select-content').contains('Inspection').click();
    

    //service name  
    cy.get('#mat-input-0').type('test');
    

    //Partner Technician
    cy.get(':nth-child(6) > .sub-column-right-margin > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click();
    cy.get('.mat-option-text').should('contain', ' Daniel Sanchez ' , ' Gerardo Camacho ' , ' José Macías ', 'Gilberto Macias')
    cy.get('.mat-option-text').contains('Gilberto Macias').click();
    
    
    //junior tech
    cy.get(':nth-child(6) > :nth-child(3) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix')
    .click();
    cy.get('.mat-option-text').should('contain', 'Carlos Avalos' , 'Daniel Nava' , 'Gerardo Contreras', 'Héctor Velasco' , 'Hugo González')
    cy.get('.mat-option-text').contains('Héctor Velasco').click();
    
    // type name of client
    cy.get('#mat-input-4').type(searchToUser);
    cy.get('.mat-option-text').should('contain', userName);
    cy.get('.mat-option-text').contains(userName).click();

    //check value
    //Service type
    cy.get('.crm-dialog-tab-content > :nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix')
    .should('contain', 'Inspection')

    //Service field
    cy.get('#mat-input-0').should('have.value', 'test')
    //Partner tech
    cy.get(':nth-child(6) > .sub-column-right-margin > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix')
    .should('contain', 'Gilberto Macias');
    //Junior Tech
    cy.get(':nth-child(6) > :nth-child(3) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix')
    .should('contain', 'Héctor Velasco');
    //Client Name
    cy.get('#mat-input-4').should('have.value', userName)
    //Client car
    cy.get('.mat-select-value-text > .ng-tns-c9-27').should('contain', 'Abarth 1000 2020');
   
    //create appointment
    cy.get('.mat-dialog-actions > .mat-primary').contains('Schedule').click();
    })
})