import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import CartPage from "../pages/cartPage";
import CustomerPage from "../pages/customerPage";
import CheckoutPage from "../pages/checkoutPage";

import loginData from "../fixtures/loginData.json";
import customerData from "../fixtures/customerData.json";

const loginPage = new LoginPage();
const homePage = new HomePage();
const cartPage = new CartPage();
const customerPage = new CustomerPage();
const checkoutPage = new CheckoutPage();



describe("Smoke suite", () => {

     beforeEach(() => {
        cy.clearLocalStorage();
    });


    it("Login with valid credentials", () => {

        loginPage.visitLoginPage();

        loginPage.login(loginData.validUser[0].username,
                        loginData.validUser[0].password);

        cy.get(".app_logo").should("have.text", "Swag Labs");

        homePage.addProductToCartByIndex(0);
        homePage.openCart();

        cartPage.removeProductByIndex(0);
        homePage.selectDropdownMenu("All Items");

        cy.get(".app_logo").should("have.text", "Swag Labs");

        homePage.addProductToCartByIndex(1);
        homePage.openCart();

        cartPage.goToCheckoutPage();

        customerPage.fillAndContinue(
            customerData.validUserInfo.firstName,
            customerData.validUserInfo.lastName,
            customerData.validUserInfo.zipCode);

        checkoutPage.getProductsTitleByIndex(0)
            .should("contain.text", "Sauce Labs Bike Light");

        checkoutPage.getTotalPriceBeforeTax()
            .should("contain.text", "9.99");

        checkoutPage.clickFinish();

        cy.get("[data-test='complete-header']")
            .should("have.text", "Thank you for your order!");
    });

})
