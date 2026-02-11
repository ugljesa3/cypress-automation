class Footer {

    footerMessage = ".footer_copy";
    twitterBtn = "[data-test='social-twitter']";
    facebookBtn = "[data-test='social-facebook']";
    linkedInBtn = "[data-test='social-linkedin']";

    getFooterMessage(){
        return cy.get(this.footerMessage);
    }

}

export default Footer;
