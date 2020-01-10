const userName = 'Biba Ahmetov'


describe("User can navigate homepage", () => {
    before(() => {
        cy.loggedInAs();
    });

    it('finds clients"', function() {
        //writing created client name in field
        cy.get(".tab-group-container > :nth-child(2)").click();
        cy.get('client-table > .grid-container > [fxflex="none"] > #search')
            .click()
            .type(userName);

        cy.log('User with name: ' + userName + ' was founded')
        cy.get(
            ":nth-child(1) > :nth-child(3) > .grid__cell-content > .ng-star-inserted > a"
        ).should("contain", userName);

        // delete created user
        cy.get(
            'client-table > .grid-container > grid > .grid > [style="flex-direction: row; box-sizing: border-box; display: flex; flex: 1 1 1e-09px;"] > .grid__pinned-area > .grid__pinned-scroll-area > .grid__rows > :nth-child(1) > .grid__select-row'
        ).click();

        cy.get(".grid-delete-button > .mat-button-wrapper > .mat-icon").should('be.visible')
        cy.get(".grid-delete-button > .mat-button-wrapper > .mat-icon").click();
       
        // restore delete client
        // cy.get('.mat-simple-snackbar-action > .ng-tns-c19-6').click()
    });
});