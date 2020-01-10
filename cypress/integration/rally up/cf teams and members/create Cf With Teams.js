const companyName = 'cf company team/member';

describe('login in rallyup', () => {
    before(() => {
        cy.loginInRallyUpQa();
    });
    it('create cf with teams', function() {
        cy.viewport(1920, 1024);
        cy.visit('https://go.rallyupqa.com/Campaigns');
        // получить случайное число от min до max
        function randomCounter(min, max) {
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
        }
        cy.get('.form-control')
            .type(companyName)
            .type('{enter}')
            .wait(500);

        cy.get('.search-button > .material-icons').click();
        cy.get(
                '.campaign-type-container > .btn-group > .buttons-container > .dropdown-toggle > .material-icons',
            )
            .first()
            .click();
        cy.get(
                ':nth-child(1) > .card > .card-content > .campaign-type-container > .btn-group > .buttons-container > .dropdown-menu',
            )
            .contains('Copy')
            .click();

        const name = 'cf company team/member № ' + randomCounter(1, 1000);
        cy.get('#new-campaign-name')
            .type(name);

        cy.get('.modal-footer > .btn-primary')
            .click()
            .wait(500);

        cy.get(':nth-child(3) > .nav-buttons > .btn').click();
        cy.get(':nth-child(3) > .nav-buttons > .btn').click();

        //time
        cy.get(':nth-child(2) > .flatpickr-input')
            .click()
            .wait(300);
        cy.get('.today').click();

        cy.get(':nth-child(3) > .nav-buttons > .btn').click();
        cy.get(':nth-child(3) > .nav-buttons > .btn').click();
        cy.get(':nth-child(3) > .nav-buttons > .btn').click();
        cy.get(':nth-child(3) > .nav-buttons > .btn').click();
        cy.get('.spp-buttons > :nth-child(3) > .btn').click();

        cy.get('.form-group > .btn-group > .btn-primary').click();
        cy.aproveInQa(name);
    });
});