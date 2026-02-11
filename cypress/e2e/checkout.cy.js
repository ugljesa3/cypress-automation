import HomePage from "../pages/homePage";
import CartPage from "../pages/cartPage";
import CustomerPage from "../pages/customerPage";
import CheckoutPage from "../pages/checkoutPage";

import loginData from "../fixtures/loginData.json";
import productsData from "../fixtures/productsData.json";
import customerData from "../fixtures/customerData.json";

const homePage = new HomePage();
const cartPage = new CartPage();
const customerPage = new CustomerPage();
const checkoutPage = new CheckoutPage();

describe("Checkout suite", () => {

    beforeEach(() => {
        cy.clearLocalStorage();
        cy.login(loginData.validUser[0].username, 
                loginData.validUser[0].password);
    });

    

    it("Products prices are properly calculated", () => {

        homePage.addProductToCartByIndex(1);
        homePage.addProductToCartByIndex(2);
        homePage.addProductToCartByIndex(3);

        cy.get(homePage.cartBtn).click();
        cartPage.goToCheckoutPage();
        
        customerPage.fillAndContinue(
            customerData.validUserInfo.firstName,
            customerData.validUserInfo.lastName,
            customerData.validUserInfo.zipCode
        );
                                
        checkoutPage.getTotalPriceBeforeTax().should("contain", "$75.97");
    });



    it("Products labels and prices are properly displayed", () => {

        homePage.addProductToCartByIndex(0);
        homePage.addProductToCartByIndex(1);
        homePage.addProductToCartByIndex(2);
        homePage.addProductToCartByIndex(3);
        homePage.addProductToCartByIndex(4);
        homePage.addProductToCartByIndex(5);

        cy.get(homePage.cartBtn).click();
        cartPage.goToCheckoutPage();
        
        customerPage.fillAndContinue(
            customerData.validUserInfo.firstName,
            customerData.validUserInfo.lastName,
            customerData.validUserInfo.zipCode
        );

        cy.get(checkoutPage.cartList)
            .should("contain", productsData.allProducts[0].name)
            .and("contain", productsData.allProducts[0].price);
        cy.get(checkoutPage.cartList)
            .should("contain", productsData.allProducts[1].name)
            .and("contain", productsData.allProducts[1].price);
        cy.get(checkoutPage.cartList)
            .should("contain", productsData.allProducts[2].name)
            .and("contain", productsData.allProducts[2].price);
        cy.get(checkoutPage.cartList)
            .should("contain", productsData.allProducts[3].name)
            .and("contain", productsData.allProducts[3].price);
        cy.get(checkoutPage.cartList)
            .should("contain", productsData.allProducts[4].name)
            .and("contain", productsData.allProducts[4].price);
        cy.get(checkoutPage.cartList)
            .should("contain", productsData.allProducts[5].name)
            .and("contain", productsData.allProducts[5].price); 
    });



    it("Cancel button working properly", () => {

        homePage.addProductToCartByIndex(1);
        cy.get(homePage.cartBtn).click();
        cartPage.goToCheckoutPage();

        customerPage.fillAndContinue(
            customerData.validUserInfo.firstName,
            customerData.validUserInfo.lastName,
            customerData.validUserInfo.zipCode
        );

        checkoutPage.clickCancel();
        cy.url().should("include", "/inventory.html");
    });



    it("Tax element is visible", () => {

        homePage.addProductToCartByIndex(1);
        cy.get(homePage.cartBtn).click();
        cartPage.goToCheckoutPage();

        customerPage.fillAndContinue(
            customerData.validUserInfo.firstName,
            customerData.validUserInfo.lastName,
            customerData.validUserInfo.zipCode
        );

        cy.get(checkoutPage.taxElement).should("be.visible");
    });



    it("Refresh page working properly", () => {

        homePage.addProductToCartByIndex(1);
        cy.get(homePage.cartBtn).click();
        cartPage.goToCheckoutPage();

        customerPage.fillAndContinue(
            customerData.validUserInfo.firstName,
            customerData.validUserInfo.lastName,
            customerData.validUserInfo.zipCode
        );

        cy.reload();

        cy.get(checkoutPage.cartList)
            .should("contain", productsData.allProducts[1].name)
            .and("contain", productsData.allProducts[1].price);
    });



    it("Current browser tab not forgotting previous Shopping cart", () => {

        homePage.addProductToCartByIndex(1);
        cy.get(homePage.cartBtn).click();
        cartPage.goToCheckoutPage();

        customerPage.fillAndContinue(
            customerData.validUserInfo.firstName,
            customerData.validUserInfo.lastName,
            customerData.validUserInfo.zipCode
        );

        cy.get(checkoutPage.cartList)
            .should("contain", productsData.allProducts[1].name)
            .and("contain", productsData.allProducts[1].price);
    });



    it("Finish button and Successful message working properly", () => {

        homePage.addProductToCartByIndex(1);
        cy.get(homePage.cartBtn).click();
        cartPage.goToCheckoutPage();

        customerPage.fillAndContinue(
            customerData.validUserInfo.firstName,
            customerData.validUserInfo.lastName,
            customerData.validUserInfo.zipCode
        );

        checkoutPage.clickFinish();
        cy.get(checkoutPage.successfulMessage)
            .should("have.text", "Thank you for your order!");
    });



})
