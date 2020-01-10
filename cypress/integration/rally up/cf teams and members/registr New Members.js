//make donation in cf company
import { getText } from 'lorembarnak';
const companyName = 'cf company team/member'; // назавание компаниии для создания и поиска
const qaCampaigns = 'https://go.rallyupqa.com/Campaigns'; // страница кампаниий на QA

describe('login in rallyup', () => {
  before(() => {
    cy.loginInRallyUpQa();
  });

  it('donation', function() {
    cy.viewport(1920, 1024); // разрешение для теста
    cy.visit(qaCampaigns); //переход на страницу кампании

    // ввод и поиск по названию кампании для поиска
    cy.get('.form-control')
      .type(companyName)
      .type('{enter}')
      .wait(500);

    // клик по первой кампании
    cy.get(
      ':nth-child(1) > .card > .card-content > .campaign-img-container',
    ).click();

    // проверка на наличия имени компании
    cy.get('.campaign-management-overlay-header').should(
      'contain',
      companyName,
    );

    // проверка того что превью кампании содержит блоки View Campaign, View Member Center, Campaign Management, Team Fundraising
    cy.get(
      '.animated > .campaign-management-overlay-scrolling-container > .campaign-management-overlay-banner > .banner',
    ).should('contain', 'View Campaign', 'View Member Center');
    cy.get('.quick-actions-menu-content')
      .should('contain', 'Campaign Management')
      .and('contain', 'Team Fundraising');

    // клик по VIEW CAMPAIGN для перехода на страницу кампании
    cy.get('.campaign-btn-container')
      .find('a')
      .click();

    // на странице кампании проверка наличия Member Center, Donate
    cy.get('.banner40-container-absolute')
      .should('contain', companyName)
      .and('contain', 'Member Center')
      .and('contain', 'Donate');

    // создание member/teams
    cy.get(
      '.banner40-content > .banner40-btn-container > .banner40-btn-content',
    )
      .contains('Member Center')
      .click();

    //добавление members в коризну
    cy.get(
      '.member-registrations > .item-card > .item-footer > .cart-button > .btn',
    ).click();

    // ввод требуемого значения в корзине
    let quantity = 1;
    cy.get('div.width-50 > .quantity').type(quantity);
    //cy.get('#cart-modal > .modal-dialog > .modal-content > .modal-footer').contains('PROCEED TO CHECKOUT').click()

    // выход из корзины через нажатие ADD MORE
    cy.get('#cart-modal > .modal-dialog > .modal-content > .modal-footer')
      .contains('ADD MORE')
      .click();

    //проверка что после добавления members корзина появляется с значением = введенному колл-ву
    cy.get('#cart')
      .should('be.visible')
      .and('contain', quantity);

    //добавление teams в коризну
    cy.get(
      '.team-registrations > .item-card > .item-footer > .cart-button > .btn',
    ).click();

    // переход на чекаут
    cy.get('.modal-footer > .btn-primary').click();

    ////проверка что после добавления teams корзину значение увеличивается на 1
    cy.get('#cart')
      .should('be.visible')
      .and('contain', quantity + 1);

    //проверка чекаут имеет правильные поля для экрана Team Registration
    cy.get('.gray-header').should('contain', 'Checkout');
    cy.get('.tab-content')
      .should('contain', 'Review your team registration')
      .and('contain', 'Team registration');

    // получить случайное число от min до max
    function randomCounter(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    }

    //ввод названия команды
    let teamName = `team №${randomCounter(1, 100)}`;
    //ввод названия команды
    cy.get(':nth-child(1) > .col-xs-12 > .required').type(teamName);
    cy.get('.fr-element > p').type(`${getText()} team description`);
    cy.get('[data-bind="click: Next, visible: !IsLastSection()"]').click();

    //проверка чекаут имеет правильные поля для экрана Member Registration
    cy.get('.gray-header').should('contain', 'Checkout');
    cy.get('.tab-content')
      .should('contain', 'Review your member registrations')
      .and('contain', 'Member registration');

    //ввод имени и фамилии мембера
    let firstName = `First name ${randomCounter(1, 100)}`;
    let secondName = `Second name ${randomCounter(1, 100)}`;

    cy.get('[placeholder="First name"]').type(firstName); //ввод имени
    cy.get('.col-sm-5 > .required').type(secondName); // ввод фамилии

    //сохранение member
    cy.get('.col-sm-offset-3 > .btn').click();
    cy.wait(500);

    // проверка после сохранения мембера
    cy.get('.item-card-content')
      .should('contain', 'member')
      .and('contain', 'QTY');

    // cy.get('.item-card-price-quantity-second-row-quantity-input').should(
    //   'eq',
    //   quantity,
    // );

    cy.get('.panel-body > :nth-child(1)').should('not.visible');
    cy.get('.panel-heading > p')
      .should('contain', 'EDIT')
      .and('contain', firstName)
      .and('contain', secondName);

    //переход на Contact information screen
    cy.get('[data-bind="click: Next, visible: !IsLastSection()"]').click();

    //проверка наличия элементов на старнице
    cy.get('.gray-header').should('contain', 'Checkout');
    cy.get('section').should('contain', 'Your information');

    //переход к подтверждению
    cy.get('[data-bind="click: Next, visible: !IsLastSection()"]').click();
    cy.get('section')
      .find('h1')
      .should('contain', 'Review and Submit Your Registration');
    // cy.get('section')
    //   .find('div')
    //   .should('contain', 'Team  Registrations');
    cy.get('section')
      .find('table')
      .should('contain', teamName);
    // cy.get('section')
    //   .find('div')
    //   .should('contain', 'Member  Registrations');
    cy.get('section')
      .find('table')
      .should('contain', teamName)
      .and('contain', firstName)
      .and('contain', secondName);

    // cy.get('section')
    //   .find('table')
    //   .find('button')
    //   .should('contain', 'SUBMIT Registration');

    cy.get(
      '#summary-affix > .donation-summary-container > .donation-summary-buttons > div > .btn',
    ).click();
    // cy.get('section')
    //   .find('table')
    //   .find('button')
    //   .contains('SUBMIT Registration')
    //   .click();

    cy.get(
      '#body > #printable > #confirmation-page > #wrapper > section > .container > :nth-child(5) > :nth-child(1) > .card > .card-content > :nth-child(1) > .col-sm-12 > .row > .col-xs-12 > input',
    ).type(getText());
    cy.get(
      '#body > #printable > #confirmation-page > #wrapper > section > .container > :nth-child(12) > .col-lg-8 > .buttons-container > .btn',
    ).click();
  });
});
