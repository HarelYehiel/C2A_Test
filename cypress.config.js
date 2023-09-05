const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: true,
    parseSpecialCharSequences: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
