import HomePage from "../pages/homePage";
import CartPage from "../pages/cartPage";
import CustomerPage from "../pages/customerPage";

import loginData from "../fixtures/loginData.json";
import customerData from "../fixtures/customerData.json";

const homePage = new HomePage();
const cartPage = new CartPage();
const customerPage = new CustomerPage();

describe("Customer informations page", () => {


    beforeEach(() => {
        cy.clearLocalStorage();
        cy.login(loginData.validUser[0].username, 
                    loginData.validUser[0].password);

        homePage.addProductToCartByIndex(1);
        cy.get(homePage.cartBtn).click();
        cartPage.goToCheckoutPage();
    });


    it("Cancel button working properly", () => {

        customerPage.clickCancel();
        cy.url().should("include", "/cart.html");
    })


    it("Continue to payment providing First name, Last name and Zip/ Postal code", () => {

        customerPage.fillAndContinue(customerData.validUserInfo.firstName,
                                    customerData.validUserInfo.lastName,
                                    customerData.validUserInfo.zipCode
        );
        cy.url().should("include", "/checkout-step-two.html");
    })


    it("Continue to payment providing only First name", () => {

        cy.get(customerPage.firstName).type(customerData.validUserInfo.firstName);
        customerPage.clickContinue();
        customerPage.getErrorMessage().should("be.visible");
        cy.url().should("not.include", "/checkout-step-two.html");
    })


    it("Continue to payment providing only Last name", () => {

        cy.get(customerPage.lastName).type(customerData.validUserInfo.lastName);
        customerPage.clickContinue();
        customerPage.getErrorMessage().should("be.visible");
        cy.url().should("not.include", "/checkout-step-two.html");
    })


    it("Continue to payment providing only First name and Last name", () => {

        cy.get(customerPage.firstName).type(customerData.validUserInfo.firstName);
        cy.get(customerPage.lastName).type(customerData.validUserInfo.lastName);
        customerPage.clickContinue();
        customerPage.getErrorMessage().should("be.visible");
        cy.url().should("not.include", "/checkout-step-two.html");
    })


    it("Continue to payment providing only Zip/ Postal Code", () => {

        cy.get(customerPage.zipPostalCode).type(customerData.validUserInfo.zipCode);
        customerPage.clickContinue();
        customerPage.getErrorMessage().should("be.visible");
        cy.url().should("not.include", "/checkout-step-two.html");
    })


    it("Continue to payment leaving blank all fields", () => {

        customerPage.clickContinue();
        customerPage.getErrorMessage().should("be.visible");
        cy.url().should("not.include", "/checkout-step-two.html");
    })


// Bug: Aplication accept numeric input in First Name, Last Name, and Zip code fields
// Expected: Error message is visible and User stays at the same page
// Actual: Error message is not visible and User is redirected to Checkout page
    it.skip("Continue to payment providing numbers in all fields", () => {

        customerPage.fillAndContinue(customerData.invalidUserInfo[0].firstName,
                                    customerData.invalidUserInfo[0].lastName,
                                    customerData.invalidUserInfo[0].zipCode
        );
        customerPage.getErrorMessage().should("be.visible");
        cy.url().should("not.include", "/checkout-step-two.html");
    })


// Bug: Aplication accept special characters input in First Name, Last Name, and Zip code fields
// Expected: Error message is visible and User stays at the same page
// Actual: Error message is not visible and User is redirected to Checkout page
    it.skip("Continue to payment providing special characters in all fields", () => {

        customerPage.fillAndContinue(customerData.invalidUserInfo[1].firstName,
                                    customerData.invalidUserInfo[1].lastName,
                                    customerData.invalidUserInfo[1].zipCode
        );
        customerPage.getErrorMessage().should("be.visible");
        cy.url().should("not.include", "/checkout-step-two.html");
    })


})
