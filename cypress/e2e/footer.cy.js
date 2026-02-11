import FooterComponent from "../pages/footerComponent";

import loginData from "../fixtures/loginData.json";

const footerComponent = new FooterComponent();


describe("Footer", () => {

    beforeEach(() => {
        cy.clearLocalStorage();
        cy.login(loginData.validUser[0].username, 
                loginData.validUser[0].password);
    });



    it("Footer message is properly displayed", () => {

        footerComponent.getFooterMessage()
            .should("contain", "Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
    })



    it("Twitter, Facebook and Linkedin links are properly displayed", () => {

        cy.get(footerComponent.twitterBtn).should("be.visible");
        cy.get(footerComponent.facebookBtn).should("be.visible");
        cy.get(footerComponent.linkedInBtn).should("be.visible");
    })



    it("Twitter, Facebook and Linkedin links are working properly", () => {

        cy.get(footerComponent.twitterBtn).should("have.attr", "href")
            .and("include", "https://twitter.com/saucelabs");

        cy.get(footerComponent.facebookBtn).should("have.attr", "href")
            .and("include", "https://www.facebook.com/saucelabs");

        cy.get(footerComponent.linkedInBtn).should("have.attr", "href")
            .and("include", "https://www.linkedin.com/company/sauce-labs/");
    })


})
