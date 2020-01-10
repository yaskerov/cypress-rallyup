describe('login in rallyup', () => {
  before(() => {
    cy.loginInRallyUpQa();
  });
  it('create cf', function() {
    cy.viewport(1920, 1024);

    function randomCounter(min, max) {
      // получить случайное число от (min-0.5) до (max+0.5)
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    }
    cy.visit('https://go.rallyupqa.com/Campaigns');
    cy.get(
      '.card > .card-content > .campaign-type-container > .btn-group > .buttons-container > .dropdown-toggle > .material-icons',
    )
      .first()
      .click();
    cy.get(
      ':nth-child(1) > .card > .card-content > .campaign-type-container > .btn-group > .buttons-container > .dropdown-menu',
    )
      .contains('Copy')
      .click();

    const name = 'cf company № ' + randomCounter(1, 1000);
    cy.get('#new-campaign-name').type(name);

    cy.get('.modal-footer > .btn-primary')
      .click()
      .wait(500);
    cy.log(name);

    cy.get(
      '.col-sm-12 > .row > .col-xs-12 > .radio-button-group > :nth-child(1) > label',
    ).click();

    cy.get('.nav-buttons > .btn').click();

    cy.get(':nth-child(3) > .nav-buttons > .btn').click();

    cy.get(':nth-child(2) > .flatpickr-input')
      .click()
      .wait(300);
    cy.get('.today').click();

    cy.get(':nth-child(3) > .nav-buttons > .btn').click();
    cy.get(':nth-child(3) > .nav-buttons > .btn').click();

    cy.get('.spp-buttons > :nth-child(3) > .btn').click();

    cy.get('.form-group > .btn-group > .btn-primary').click();

    cy.get('#campaign-submission-page > .buttons > .btn').click();

    cy.aproveInQa(name);
  });
});
