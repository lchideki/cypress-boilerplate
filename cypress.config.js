const { defineConfig } = require('cypress');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/features/**/*.feature',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)]
      }));
      
      return {
        ...config,
        stepDefinitions: {
          filterSpecs: true,
          nonGlobalStepDefinitions: false,
          specPattern: [
            'cypress/e2e/step_definitions/*.js',
            'cypress/e2e/step_definitions/**/*.js'
          ]
        }
      };
    }
  }
});