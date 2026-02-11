import HomePage from "../pages/homePage";
import CartPage from "../pages/cartPage";

import loginData from "../fixtures/loginData.json";

const homePage = new HomePage();
const cartPage = new CartPage();


describe("Cart suite", () => {

    beforeEach(() => {
        cy.clearLocalStorage();
        cy.login(loginData.validUser[0].username, 
                loginData.validUser[0].password);
        cy.get(homePage.cartBtn).click();
    });



    it("Cart page title (Your cart) is properly displayed", () => {

        cy.get(cartPage.cartPageTitle).should("have.text", "Your Cart");
    })


    it("Continue shopping button working properly", () => {

        cy.get(cartPage.continueShoppingBtn).click();
        cy.url().should("include", "/inventory.html");
    })


    it("Checkout button working properly", () => {

        cy.get(cartPage.checkoutBtn).click();
        cy.url().should("include", "/checkout-step-one.html");
    })


    it("Application title is properly displayed", () => {

        cy.get(homePage.appLogo).should("be.visible");
    })


    it("Adding products to cart working properly", () => {

        cy.get(cartPage.continueShoppingBtn).click();
        homePage.addProductToCartByIndex(1);
        cy.get(homePage.cartBtn).click();
        cartPage.getAllProducts().should("contain", "Sauce Labs Bike Light");
    })


    it("Cart details displayed properly", () => {

        cy.get(cartPage.continueShoppingBtn).click();
        homePage.addProductToCartByIndex(1);
        cy.get(homePage.cartBtn).click();
        cartPage.getAllProducts().should("contain", "Sauce Labs Bike Light")
        .and("contain", "9.99")
        .and("contain", "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.")
        .and("contain", "1");
    })


    it("Remove button working properly", () => {

        cy.get(cartPage.continueShoppingBtn).click();
        homePage.addProductToCartByIndex(2);
        cy.get(homePage.cartBtn).click();
        cy.get(cartPage.removeBtn).click();
        cartPage.getAllProducts().should("not.exist");
    })


    it("Adding product to cart, go back, go forward working properly", () => {

        cy.get(cartPage.continueShoppingBtn).click();
        homePage.addProductToCartByIndex(2);
        cy.get(homePage.cartBtn).click();
        cy.go(-1);
        cy.wait(2000);
        cy.go(1);
        cartPage.getAllProducts().should("contain", "Sauce Labs Bolt T-Shirt");
    })


    it("Refresh page working properly", () => {

        cy.get(cartPage.continueShoppingBtn).click();
        homePage.addProductToCartByIndex(2);
        cy.get(homePage.cartBtn).click();
        cy.reload();
        cy.wait(3000);
        cartPage.getAllProducts().should("contain", "Sauce Labs Bolt T-Shirt");
    })


    it("Increasing quantity working properly", () => {

        cy.get(cartPage.continueShoppingBtn).click();
        homePage.addProductToCartByIndex(2);
        homePage.addProductToCartByIndex(4);
        homePage.addProductToCartByIndex(1);
        cy.get(homePage.cartBtn).click();
        
        cartPage.getQuantity().should("have.text", "3");
    })

})
