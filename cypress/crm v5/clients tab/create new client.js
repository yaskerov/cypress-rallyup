describe("User can navigate homepage", () => {
    before(() => {
        cy.loggedInAs();
    });

    it('finds the content "type"', function() {
        function formatDate(date) {
            var monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ];

            let day = date.getDate();
            let monthIndex = date.getMonth();
            let year = date.getFullYear();

            return day + " " + monthNames[monthIndex] + " " + year;
        }

        // create new client
        cy.get('#mat-badge-content-3').wait(1000).then(($span) => {
            const counterValue = $span.text();
            cy.log(counterValue)
        })
        cy.get('#mat-badge-content-3').then(($span) => {
            // capture counter value now
            const counterValuePrev = parseFloat($span.text())

            cy.get(
                    "pending-client-table > .grid-container > .grid-controls-container > .grid-buttons > .grid-plus-button"
                )
                .click()
                .wait(1000).then(() => {
                    // now capture it again
                    const counterNewValue = parseFloat($span.text())

                    // make sure it's what we expected
                    expect(counterNewValue).to.eq(counterValuePrev + 1)
                })
        })

        // check date
        cy.get('.grid__rows > :nth-child(1) > [style="width: 130px;"]').should(
            "contain",
            formatDate(new Date())
        );

        cy.log("data" + formatDate(new Date()));

        // choose b.unit

        cy.get(
            '.grid__cell_active > .grid__cell-content > .ng-star-inserted > [fxlayout="row"]'
        ).dblclick();

        cy.get(".mat-option-text")
            .should("contain", "VTA", "GDL")
            .wait(500);

        cy.get(".mat-option-text")
            .first()
            .click()
            .wait(500);

        // enter the name
        //click on name field

        cy.get(".grid__row_highlighted > :nth-child(3)")
            .first()
            .dblclick()
            .wait(500);

        // typing name in field

        cy.get(
                ".grid__cell-content > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix"
            )
            .type("Biba Ahmetov")
            .wait(500);

        //choose type of client
        //click on type field
        cy.get(
                '.grid__row_highlighted > :nth-child(4) > .grid__cell-content > .ng-star-inserted > [fxlayout="row"]'
            )
            .dblclick()
            .wait(500);

        //check contain type dropdown
        cy.get(".mat-option-text")
            .should("contain", "Customer", "Fleet", "P.Workshop")
            .wait(500);

        // click on first element in dropdown
        cy.get(".mat-option-text")
            .first()
            .click()
            .wait(500);
        //check contain Customer in the field
        cy.get(
                '.grid__row_highlighted > :nth-child(4) > .grid__cell-content > .ng-star-inserted > [fxlayout="row"]'
            )
            .should("contain", "Customer")
            .wait(500);

        // enter telephone number
        //click on telephone field
        cy.get(".grid__row_highlighted > :nth-child(5)").dblclick();
        
        cy.get(
                ".grid__cell-content > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix"
            )
            .wait(500)
            .type("+123456789");

        //choose car make
        cy.get(
                '.grid__row_highlighted > :nth-child(6) > .grid__cell-content > .ng-star-inserted > [fxlayout="row"]'
            )
            .wait(500)
            .dblclick({ force: true });
        cy.get(".mat-option-text")
            .should("contain", "Abarth", "Ac", "Acura", "Aise-Master", "Alfa Romeo")
            .wait(500);
        cy.get(".mat-option-text")
            .first()
            .click();

        //choose model
        cy.get(
            '.grid__row_highlighted > :nth-child(7) > .grid__cell-content > .ng-star-inserted > [fxlayout="row"]'
        ).wait(500).dblclick();
        cy.get(".mat-option-text")
            .should("contain", "1000", "1000 Bialbero", "1000 GT", "Lancia 037")
            .wait(500);
        cy.get(".mat-option-text").wait(500)
            .first()
            .click()


        //choose year
        cy.get(
            '.grid__row_highlighted > :nth-child(8) > .grid__cell-content > .ng-star-inserted > [fxlayout="row"]'
        ).dblclick();
        cy.get(".mat-option-text")
            .should("contain", "2020", "2019", "2018")
            .wait(500);
        cy.get(".mat-option-text")
            .first()
            .click({ force: true });

        // fuel type
        cy.get(
            '.grid__row_highlighted > [style="width: 140px;"] > .grid__cell-content > .ng-star-inserted > [fxlayout="row"]'
        ).dblclick().wait(500);
        cy.get(".mat-option-text").wait(500)
            .first()
            .click();

        //whatsup link
        cy.get('.grid__rows > :nth-child(1) > [style="width: 220px;"]').dblclick().wait(500);
        cy.get(
                ".grid__cell-content > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix"
            ).wait(500)
            .type("https://www.google.com/")
            .wait(1000);

        //registred
        cy.get('.grid__rows > :nth-child(1) > [style="width: 148px;"]')
            .click()
            .wait(1000);
        cy.get(
            ':nth-child(1) > [style="width: 148px;"] > .grid__cell-content > .crm-grid-cell-button'
        ).click().wait(1000);
    });
});