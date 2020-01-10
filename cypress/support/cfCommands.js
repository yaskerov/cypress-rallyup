Cypress.Commands.add('chooseType', (type) => {
  if (type == 1) {
    cy.get(':nth-child(1) > label').click();
    cy.get('.aex-dropdown-input').click();
    cy.get('.aex-dropdown-list')
      .first()
      .click();
  } else if (type == 2) {
    cy.get('.radio-button-group > :nth-child(2) > label').click();
    cy.get('.aex-dropdown-input').click();
    cy.get('.aex-dropdown-list')
      .first()
      .click();
  } else {
    cy.get(':nth-child(3) > label').click();
  }
});

Cypress.Commands.add('calcTips', (money) => {
  if (Number.isInteger(money * 0.1)) {
    let tipTax10 = money * 0.1;
    cy.get('.aex-dropdown-list > :nth-child(1)').should(
      'contain',
      `10% ($${tipTax10}.00)`,
    );
  } else if (!Number.isInteger(money * 0.15)) {
    let tipTax15 = money * (0.15).toFixed(2);
    cy.get('.selected').should('contain', `15% ($${tipTax15})`);
  } else if (!Number.isInteger(money * 0.2)) {
    let tipTax20 = money * (0.2).toFixed(2);

    cy.get('.aex-dropdown-list > :nth-child(3)').should(
      'contain',
      `20% ($${tipTax20})`,
    );
  }
});
