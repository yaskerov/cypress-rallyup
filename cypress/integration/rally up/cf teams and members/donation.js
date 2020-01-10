const companyName = 'cf company team/member';
const money = 15;

describe('login in rallyup', () => {
  before(() => {
    cy.loginInRallyUpQa();
  });

  it('donation', function() {
    cy.viewport(1920, 1024);
    //make donation in cf company

    cy.visit('https://go.rallyupqa.com/Campaigns');
    cy.get('.form-control')
      .type(companyName)
      .type('{enter}')
      .wait(500);

    cy.get(
      ':nth-child(1) > .card > .card-content > .campaign-img-container',
    ).click();

    cy.get('.campaign-management-overlay-header').should(
      'contain',
      companyName,
    );
    cy.get(
      '.animated > .campaign-management-overlay-scrolling-container > .campaign-management-overlay-banner > .banner',
    ).should('contain', 'View Campaign', 'View Member Center');
    cy.get('.quick-actions-menu-content')
      .should('contain', 'Campaign Management')
      .and('contain', 'Team Fundraising');

    cy.get('.campaign-btn-container > .btn').click();

    cy.get('.banner40-container-absolute')
      .should('contain', companyName)
      .and('contain', 'Member Center')
      .and('contain', 'Donate');
    cy.get(
      '.banner40-content > .banner40-btn-container > .banner40-btn-content',
    )
      .contains('Donate')
      .click();

    cy.get('.gray-header').should('contain', 'Checkout');
    cy.get('.currency-input').should('contain', '');

    cy.get('.currency-input')
      .type(money)
      .wait(300);

    cy.get('[data-bind="click: Next, visible: !IsLastSection()"]').click();

    //members donation

    const name = 2;
    cy.chooseType(name);

    cy.get('[data-bind="click: Next, visible: !IsLastSection()"]').click();

    cy.calcTips(money);
    cy.get('[data-bind="click: Next, visible: !IsLastSection()"]').click();
    cy.get(
      '#summary-affix > .donation-summary-container > .donation-summary-buttons > div > .btn',
    ).should('contain', 'SUBMIT Payment');

    cy.get('#summary-affix > .donation-summary-container')
      .should('contain', 'Review Your Donation')
      .and('contain', `$${money}.00`)
      .and('contain', `$${money * 0.15}`)
      .and('contain', `$${(money * 0.15 + money).toFixed(2)}`);

    cy.get('.__PrivateStripeElement iframe')
      .wait(300)
      .then(($iframe) => {
        cy.wrap($iframe.contents()[0].body)
          .find('input[name="cardnumber"]')
          .type('4111111111111111');
        cy.wrap($iframe.contents()[1].body)
          .find('input[name=exp-date]')
          .type('1230');
        cy.wrap($iframe.contents()[2].body)
          .find('input[name=cvc]')
          .type('123');
        cy.wrap($iframe.contents()[3].body)
          .find('input[name=postal]')
          .type('12312');
      });

    cy.get('.fluid-button')
      .click()
      .wait(2000);
    cy.wait(2000);

    cy.get('#body > #printable > #confirmation-page > .gray-header').should(
      'contain',
      'Donation Confirmed',
    );

    cy.get(
      '#body > #printable > #confirmation-page > #wrapper > section > .container > :nth-child(1) > :nth-child(1) > .card > .card-content > :nth-child(1) > .col-sm-12 > .row > .col-xs-12 > input',
    ).type('Text comments');
    cy.get(
      '#body > #printable > #confirmation-page > #wrapper > section > .container > :nth-child(4) > .col-sm-12',
    )
      .should('contain', 'Donation Summary')
      .and('contain', `$${money}.00`)
      .and('contain', `$${money * 0.15}`)
      .and('contain', `$${(money * 0.15 + money).toFixed(2)}`);
    cy.get(
      '#body > #printable > #confirmation-page > #wrapper > section > .container > :nth-child(7) > .col-lg-8 > .buttons-container > .btn',
    ).click();

    cy.get('#supporters > :nth-child(1)').click();
    cy.get('.card-raised-amount').should('contain', `$${money}`);
  });
});
