//rally up creds and log in
//cred for QA
const rallyupQa = 'https://go.rallyupqa.com/';
const rallyupQaEmail = 'jaskerov@aexsoft.com';
const rallyupQaPassword = 'Furion123';

Cypress.Commands.add('loginInRallyUpQa', () => {
    cy.visit(rallyupQa);
    cy.get('.input-field').type(rallyupQaEmail);
    cy.get('#find-email-button').click().wait(500);
    cy.get('.input-field > label').type(rallyupQaPassword);
    cy.get('.buttons > .btn').click();
    cy.get('.initials').click()
    cy.get('.popover-content').should('contain', rallyupQaEmail)
  });

//cred for Staging
const rallyupStaging = 'https://go.rallyupstaging.com/';
const rallyupStagingEmail = 'jaskerov@aexsoft.com';
const rallyupStagingPassword = 'Furion123';

Cypress.Commands.add('loginInRallyUpStaging', () => {
    cy.visit(rallyupStaging);
    cy.get('.input-field').type(rallyupStagingEmail);
    cy.get('#find-email-button').click();
    cy.get('.input-field > label').type(rallyupStagingPassword);
    cy.get('.buttons > .btn').click();
    cy.get('.initials').click()
    cy.get('.popover-content').should('contain', rallyupStagingEmail)
  });

  const COMMAND_DELAY = 1000;

for (const command of ['visit', 'click', 'trigger', 'type', 'clear', 'reload', 'contains']) {
    Cypress.Commands.overwrite(command, (originalFn, ...args) => {
        const origVal = originalFn(...args);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(origVal);
            }, COMMAND_DELAY);
        });
    });
} 