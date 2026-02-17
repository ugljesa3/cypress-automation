const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/html",
    charts: true,
    reportPageTitle: "Cypress Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },
});