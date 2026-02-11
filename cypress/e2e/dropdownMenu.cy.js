import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import CartPage from "../pages/cartPage";

import loginData from "../fixtures/loginData.json";

const loginPage = new LoginPage();
const homePage = new HomePage();
const cartPage = new CartPage();



describe("Dropdown Menu", () => {

    beforeEach(() => {
        cy.clearLocalStorage();
        cy.login(loginData.validUser[0].username, 
                loginData.validUser[0].password);
    });



    it("Drop-down Menu is presented", () => {

        cy.get(homePage.dropdownMenu).should("be.visible");
    })



    it("Log-out link working properly", () => {

        cy.get(homePage.dropdownMenu).should("be.visible").click();
        cy.get(homePage.logOutBtn).should("be.visible").click();
        cy.get(loginPage.loginLogo).should("be.visible");
    })


// Bug: "Reset App State" option in dropdown menu does not clear cart
// Expected: Clicking "Reset App State" remove all items from the shopping cart
// Actual: Product remains in cart after clicking "Reset App State"
    it.skip("Dropdown elements are present and working properly", () => {

        cy.get(homePage.dropdownMenu).should("be.visible");
        homePage.openCart();

        cy.get(homePage.dropdownMenu).should("be.visible").click();

        cy.get(homePage.allItemsBtn)
            .should("be.visible").click();
        cy.get(homePage.appLogo).should("exist");

        cy.get(homePage.dropdownMenu).click();
        cy.get(homePage.aboutBtn)
            .should("have.attr", "href").and("include", "https://saucelabs.com/");
        cy.get(homePage.appLogo).click();

        homePage.addProductToCartByIndex(0);
        homePage.openCart();
        cartPage.getProductTitleByIndex(0).should("have.text", "Sauce Labs Backpack");

        homePage.clickResetAppState();

        cartPage.getProductTitleByIndex(0).should("not.exist");      
        
        cy.get(homePage.logOutBtn).should("be.visible").click();
        cy.get(loginPage.loginLogo).should("be.visible");

    })


    it("Close dropdownMenu button working properly", () => {

        cy.get(homePage.dropdownMenu).should("be.visible").click();
        homePage.clickCloseDropdown();
        cy.get(homePage.allItemsBtn)
            .should("not.be.visible");

        cy.get(homePage.dropdownMenu).should("be.visible").click();
        cy.get(homePage.logOutBtn).should("be.visible").click();
        cy.get(loginPage.loginLogo).should("be.visible");
    })


// Bug: Dropdown menu does not close when clicking outside of it
// Expected: Clicking outside the dropdown (on app logo or page content) close the menu
// Actual: Dropdown menu remains open and visible after clicking outside of it
    it.skip("Clicking by side is closing the dropdown menu", () => {

        cy.get(homePage.dropdownMenu).should("be.visible").click();
        cy.get(homePage.appLogo).click();
        cy.get(homePage.allItemsBtn)
            .should("not.be.visible");
    })

})
