//aprove in QA

Cypress.Commands.add('aproveInQa', (name) => {
    cy.visit('https://go.rallyupqa.com/Administration/Campaigns');
        cy.get('label').type('obesova@aexsoft.com');
        cy.get('#find-email-button').click();
        cy.get('.input-field > label').type('123456');
        cy.get('.buttons > .btn').click().wait(500);
        cy.get(':nth-child(1) > .name').should('contain' , name);
        cy.get(':nth-child(1) > .manage > .btn-group > .btn').click();
        cy.get(':nth-child(1) > .manage > .btn-group > .dropdown-menu').contains('Approve').click();
        cy.get('.modal-footer > .btn-group > .btn-primary').click();
});

//aprove Staging