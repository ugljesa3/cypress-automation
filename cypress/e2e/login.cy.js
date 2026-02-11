import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";

import loginData from "../fixtures/loginData.json";

const loginPage = new LoginPage();
const homePage = new HomePage();



describe("Login suite", () => {

    beforeEach(() => {
        cy.clearLocalStorage();
        loginPage.visitLoginPage();
    })


    it("Login with valid credentials", () => {

        loginData.validUser.forEach((user) => {
            loginPage.visitLoginPage();
            loginPage.login(user.username,
                            user.password
            )
        })
        homePage.getAppLogo().should("be.visible");
    })


    it("Log-out is working properly", () => {

        loginPage.login(loginData.validUser[0].username,
                        loginData.validUser[0].password
        )
        homePage.getAppLogo().should("be.visible");
        homePage.logOut();
        loginPage.getLoginLogo().should("be.visible");
    })


    it("Login with invalid credentials", () => {

        loginData.invalidUser.forEach((user) => {
            loginPage.visitLoginPage();
            loginPage.login(user.username,
                            user.password
                        );

        loginPage.getErrorMessage().should("be.visible");
        homePage.getAppLogo().should("not.exist");                
        })
    })


    it("Login with special credentials", () => {

        loginData.specialUser.forEach((user) => {
            loginPage.visitLoginPage();
            loginPage.login(user.username,
                            user.password
                        );

        loginPage.getErrorMessage().should("be.visible");
        homePage.getAppLogo().should("not.exist");                
        })
    })


    it("Login with blank Username field", () => {
        cy.get(loginPage.passwordField).type("secret_sauce");
        loginPage.clickLoginBtn();
        loginPage.getErrorMessage().should("be.visible");
        homePage.getAppLogo().should("not.exist");
    })

    it("Login with blank Password field", () => {
        cy.get(loginPage.usernameField).type("standard_user");
        loginPage.clickLoginBtn();
        loginPage.getErrorMessage().should("be.visible");
        homePage.getAppLogo().should("not.exist");
    })

    it("Login with blank Username and Password fields", () => {
        loginPage.clickLoginBtn();
        loginPage.getErrorMessage().should("be.visible");
        homePage.getAppLogo().should("not.exist");
    })


    it("Proper displaying placeholders", () => {

        cy.get(loginPage.usernameField)
            .should("have.attr", "placeholder", "Username");
        cy.get(loginPage.passwordField)
            .should("have.attr", "placeholder", "Password");
    })


    it("Password privacy during typing", () => {

        cy.get(loginPage.passwordField).type(loginData.validUser[0].password)
        .should("have.attr", "type", "password");
    })



// Bug: User remains logged in after navigating back and forward
// Expected: After go back and go forward, user should be redirected to login page and asked to re-enter credentials
// Actual: User stays logged in without re-entering credentials
    it.skip("Login with valid credentials, go back, go forward", () => {

        loginPage.login(loginData.validUser[0].username,
                        loginData.validUser[0].password
        );
        homePage.getAppLogo().should("be.visible");
        cy.go(-1);
        loginPage.getLoginLogo().should("be.visible");
        cy.go(1);

        homePage.getAppLogo().should("not.exist");
        cy.get(loginPage.usernameField).should("be.empty");
        cy.get(loginPage.passwordField).should("be.empty");
    })

})
