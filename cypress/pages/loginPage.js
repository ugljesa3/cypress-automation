class LoginPage{
    usernameField = "#user-name";
    passwordField = "#password";
    loginBtn = "#login-button";
    errorMessage = "h3[data-test='error']";
    loginLogo = ".login_logo";

    visitLoginPage(){
        cy.visit("/");
    }

    login(username, password){
        cy.get(this.usernameField).type(username);
        cy.get(this.passwordField).type(password);
        cy.get(this.loginBtn).click();
    }

    getErrorMessage(){
        return cy.get(this.errorMessage);
    }

    getLoginLogo(){
        return cy.get(this.loginLogo);
    }
    clickLoginBtn(){
        cy.get(this.loginBtn).click();
    }

}

export default LoginPage;
