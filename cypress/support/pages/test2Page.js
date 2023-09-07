export class test2Page {

    test2_url = 'https://www.demoblaze.com/';
    test2_textbox_username = '#loginusername';
    test2_username = 'automatedUser26@example.com';
    test2_textbox_password = '#loginpassword';
    test2_password = '4r4nd0mp4ssw0rd';
    test2_button_login1 = '#login2';
    test2_button_login2 = '#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary';
    test2_button_Phone = 'Phone';

    navigate() {
        cy.visit(this.test2_url)
    }
    login() {
        cy.get(this.test2_button_login1)
            .click();
        cy.get(this.test2_textbox_username)
            .should('be.visible')
            .clear()
            .type(this.test2_username)
        cy.get(this.test2_textbox_password)
            .type(this.test2_password);
        cy.get(this.test2_button_login2)
            .click()
    }
    clickPhones() {
        cy.contains(this.test2_button_Phone).click().click();
    }
    findtheCheapestPhone() {
        return new Promise((resolve) => {
            // Takes the price of the first cell phone and compares to all the others
            cy.get(this.getTheEventPhone_by_index(1)).invoke('text').then((text) => {

                // Get the first phone's price.
                let theCheapest_price = parseFloat(text.replace('$', ''));
                let theCheapest_phone = 1;

                this.countChildElementsById('tbodyid').then((numberOfChildren) => {

                    // Use a loop to interact with all  elements kind of phones
                    for (let i = 2; i <= numberOfChildren; i++) {
                        // Takes the price and keeps it if it is the smallest.
                        cy.get(this.getTheEventPhone_by_index(i)).invoke('text').then((text) => {

                            let nextPrice = parseFloat(text.replace('$', ''));

                            if (nextPrice < theCheapest_price) {
                                theCheapest_price = nextPrice;
                                theCheapest_phone = i;
                            }
                            if (i === numberOfChildren) {
                                resolve(theCheapest_phone);
                            }
                        });
                    }
                });
            });
        })
    }
    countChildElementsById(elementId) {
        // Use Cypress to select the element with the specified ID
        return cy.get(`#${elementId}`).children().then((children) => {
            // Get the length of the child elements and return it as a promise
            return children.length;
        });
    }
    addTheCheapestPhoneToCart() {
        //Promise p = this.findtheCheapestPhone();
        this.findtheCheapestPhone().then((data) => {
            cy.get(`:nth-child(${data}) > .card > .card-block > .card-title > .hrefch`).click(); //The cheapest phone's name.
            cy.contains('Add to cart').click();
            cy.contains('Cart').click();
        });
    }
    getTheEventPhone_by_index(index) {
        return `:nth-child(${index}) > .card > .card-block > h5`;
    }
}