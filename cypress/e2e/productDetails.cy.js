import HomePage from "../pages/homePage";

import loginData from "../fixtures/loginData.json";
import productsData from "../fixtures/productsData.json";

const homePage = new HomePage();


describe("Product details and listing", () => {

    beforeEach(() => {
        cy.clearLocalStorage();
        cy.login(loginData.validUser[0].username, 
                loginData.validUser[0].password);
    });


    it("All products proprerly displayed", () => {

        homePage.getAllProducts()
            .should("have.length", productsData.allProducts.length);

        productsData.allProducts.forEach((product, index) => {

            homePage.getProductsTitleByIndex(index)
                .should("have.text", product.name);

            homePage.getProductsPriceByIndex(index)
                .should("contain.text", product.price)
        });
    })


    it("Back to products button working properly", () => {

        cy.url().should("include", "/inventory.html");

        homePage.getProductsTitleByIndex(0).click();
        cy.url().should("include", "/inventory-item.html?id=4");
        cy.get(homePage.backToProductsBtn).click();
        cy.url().should("include", "/inventory.html");
    })


    it("All products links working properly", () => {

       homePage.getProductsTitleByIndex(0).click();
       cy.url().should("include", "/inventory-item.html?id=4");
       cy.get(homePage.backToProductsBtn).click();
       
       homePage.getProductsTitleByIndex(1).click();
       cy.url().should("include", "/inventory-item.html?id=0");
       cy.get(homePage.backToProductsBtn).click();
       
       homePage.getProductsTitleByIndex(2).click();
       cy.url().should("include", "/inventory-item.html?id=1");
       cy.get(homePage.backToProductsBtn).click();

       homePage.getProductsTitleByIndex(3).click();
       cy.url().should("include", "/inventory-item.html?id=5");
       cy.get(homePage.backToProductsBtn).click();

       homePage.getProductsTitleByIndex(4).click();
       cy.url().should("include", "/inventory-item.html?id=2");
       cy.get(homePage.backToProductsBtn).click();

       homePage.getProductsTitleByIndex(5).click();
       cy.url().should("include", "/inventory-item.html?id=3");
    })



    it("Products names are properly displayed", () => {


        productsData.allProducts.forEach((product, index) => {

            homePage.getProductsTitleByIndex(index)
                .should("contain.text", product.name);
        })
    })


    it("Products prices are properly displayed", () => {


        productsData.allProducts.forEach((product, index) => {

            homePage.getProductsPriceByIndex(index)
                .should("contain.text", product.price);
        })
    })


})
