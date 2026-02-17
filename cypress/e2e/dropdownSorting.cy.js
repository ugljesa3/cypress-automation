import HomePage from "../pages/homePage";

import loginData from "../fixtures/loginData.json";

const homePage = new HomePage();


describe("Dropdown Sorting", () => {

    beforeEach(() => {
        cy.clearLocalStorage();
        cy.login(loginData.validUser[0].username, 
                loginData.validUser[0].password);
    });


    it("Dropdown Sorting element is presented", () => {

        cy.get(homePage.dropdownSort).should("be.visible");
        cy.get(homePage.appLogo).click();
    })


    it("Dropdown Sorting Z-A", () => {

        cy.get(homePage.dropdownSort).should("be.visible");
        homePage.selectSort("Name (Z to A)");
        homePage.getProductsTitleByIndex(0)
            .should("have.text", "Test.allTheThings() T-Shirt (Red)");
    })


    it("Dropdown Sorting A-Z", () => {

        cy.get(homePage.dropdownSort).should("be.visible");
        homePage.selectSort("Name (Z to A)");
        homePage.getProductsTitleByIndex(0)
            .should("have.text", "Test.allTheThings() T-Shirt (Red)");

        cy.get(homePage.dropdownSort).should("be.visible");
        homePage.selectSort("Name (A to Z)");
        homePage.getProductsTitleByIndex(0)
            .should("have.text", "Sauce Labs Backpack");
    })


    it("Dropdown Sorting Price low to high", () => {

        cy.get(homePage.dropdownSort).should("be.visible");
        homePage.selectSort("Price (low to high)");
        homePage.getProductsTitleByIndex(0)
            .should("have.text", "Sauce Labs Onesie");
    })


    it("Dropdown Sorting Price high to low", () => {

        cy.get(homePage.dropdownSort).should("be.visible");
        homePage.selectSort("Price (high to low)");
        homePage.getProductsTitleByIndex(0)
            .should("have.text", "Sauce Labs Fleece Jacket");
    })
    
    it("Default option A-Z is primarly selected", () => {

        homePage.getProductsTitleByIndex(0)
            .should("have.text", "Sauce Labs Backpack");
        cy.get(homePage.dropdownSort).should("be.visible");
        homePage.selectSort("Name (A to Z)");
        homePage.getProductsTitleByIndex(0)
            .should("have.text", "Sauce Labs Backpack");
    })

})
