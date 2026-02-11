class CustomerPage {

    firstName = "#first-name";
    lastName = "#last-name";
    zipPostalCode = "#postal-code";
    cancelBtn = "#cancel";
    continueBtn = "#continue";
    cartBtn = ".shopping_cart_link";
    errorMessage = "h3[data-test='error']";

    goToCartPage(){
        cy.get(this.cartBtn).click();
    }

    fillAndContinue(firstName, lastName, zipPostalCode){
        cy.get(this.firstName).type(firstName);
        cy.get(this.lastName).type(lastName);
        cy.get(this.zipPostalCode).type(zipPostalCode);
        cy.get(this.continueBtn).click();
    }

    clickCancel(){
        cy.get(this.cancelBtn).click();
    }

    clickContinue(){
        cy.get(this.continueBtn).click();
    }

    getErrorMessage(){
        return cy.get(this.errorMessage);
    }

}

export default CustomerPage;
