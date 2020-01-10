import { getText } from 'lorembarnak';

const createOrgQa = 'https://go.rallyupqa.com/organization/SetupBasics/';
const createOrgStaging =
  'https://go.rallyupstaging.com/organization/SetupBasics/';

describe('login in rallyup', () => {
  before(() => {
    cy.loginInRallyUpQa();
  });
  it('publish new organization', function() {
    function randomCounter(min, max) {
      // получить случайное число от (min-0.5) до (max+0.5)
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    }
    cy.viewport(1920, 1024);
    //переход в создание организации
    cy.visit(createOrgQa);
    // нажатие на чекбокс "не могу найти организацию"
    cy.get('[type="checkbox"]')
      .first()
      .check({ force: true })
      .should('be.checked')
      .and('have.prop', 'checked');
    cy.get('.checkbox > label').click();
    cy.get('[type="checkbox"]')
      .first()
      .check({ force: true })
      .should('be.checked')
      .and('have.prop', 'checked');

    // выбор страны ямайка
    cy.get(
      '[data-bind="fadeInFadeOut: OrganizationModel.CouldNotFindOrganization()"] > :nth-child(1) > .card > .card-content > :nth-child(1) > :nth-child(1) > :nth-child(2) > dropdown > .aex-dropdown-wrapper > .aex-dropdown-input',
    ).click();
    cy.get('[value="JM"]').click();

    //название компании
    cy.get('.card-content > .subsection-block > .col-xs-12 > input').type(
      `amazing company name №${randomCounter(1, 100)}`,
    );

    //выбираем не страйп аккаунт
    cy.get(':nth-child(5) > label').click();
    cy.get(
      '[data-container=".col-xs-12"] > .col-xs-12 > .radio > label',
    ).click();
    //cy.get(':nth-child(7) > :nth-child(1) > .card > .card-content').find('a').contains('click here').click()
    cy.get('.modal-body > .checkbox > label').click();
    cy.get('.modal-footer > .btn-primary').click();
    //сохранение создания организации
    cy.get(':nth-child(2) > .btn').click();

    cy.get(
      ':nth-child(4) > :nth-child(1) > a.enabled > .action-text > .primary-action-title > span',
    ).click();
    cy.get('.col-sm-12 > .fr-box > .fr-wrapper > .fr-element').type(getText());
    cy.get(':nth-child(2) > .btn').click();

    //customize branding
    cy.get(
      ':nth-child(4) > :nth-child(2) > a.enabled > .action-text > .primary-action-title > span',
    ).click();
    cy.get('.lever').click();
    cy.get('.lever').click();
    cy.get('.lever').click();
    cy.wait(500)
    cy.get('#customSubdomain').type(`domain${randomCounter(1, 100)}`);

    cy.get(
      ':nth-child(6) > .col-xs-12 > .card > .card-content > :nth-child(1) > .input-with-text-in-line > .input-in-line > dropdown > .aex-dropdown-wrapper > .aex-dropdown-input',
    ).click();
    cy.get('.aex-dropdown-list')
      .find('li')
      .contains('Members')
      .click();
    cy.get('.spp-buttons > :nth-child(2) > .btn').click();

    //mahage funding options
    cy.get(':nth-child(3) > a.enabled > .action-text > .primary-action-title > span').click()
    cy.get('.col-sm-12 > :nth-child(3) > :nth-child(1) > .row > .col-xs-12 > input').clear().type('amazing company')
    cy.get('.spp-buttons > :nth-child(2) > .btn').click()

//cusumize your supporter center
cy.get(':nth-child(4) > a.enabled > .action-text > .primary-action-title > span').click()
cy.get('.return-to-setup > .btn').click()
cy.get(':nth-child(3) > .design-type-manage > .btn').click()
cy.get(':nth-child(6) > :nth-child(1) > .card > .card-content > :nth-child(1) > .col-sm-12').find('textarea').clear()

  });
});
