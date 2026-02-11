const { defineConfig } = require("cypress");
const cypressGrep = require("cypress-grep/src/plugin");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    setupNodeEvents(on, config) {
      config.screenshotOnRunFailure = true;
      cypressGrep(config);
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});