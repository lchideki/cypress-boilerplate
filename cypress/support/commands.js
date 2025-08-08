// Custom commands for API testing
Cypress.Commands.add('validateSchema', (schema, response) => {
  const SchemaValidator = require('./schema-validator');
  return SchemaValidator.validate(schema, response);
});
