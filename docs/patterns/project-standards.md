# Project Standards

## Feature Files

1. **Location**: `cypress/e2e/features/`
2. **Naming**: `{domain}-api.feature`
3. **Structure**:
   ```gherkin
   @domain @operation
   Feature: Domain Operation
     As a [role]
     I want to [action]
     So that [benefit]

     Background:
       Given [common setup]

     @tag1 @tag2
     Scenario: Descriptive scenario name
       Given [precondition]
       When [action]
       Then [expected result]
   ```

## Step Definitions

1. **Location**: `cypress/e2e/step_definitions/`
2. **Naming**: `{domain}-steps.js`
3. **Structure**:
   ```javascript
   // Background steps
   Given('common setup', () => {});

   // Given steps - preconditions
   Given('precondition', () => {});

   // When steps - actions
   When('action', () => {});

   // Then steps - assertions
   Then('expected result', () => {});
   ```

## Request Classes

1. **Location**: `cypress/support/requests/`
2. **Base Class**: `requests.js`
3. **Domain Classes**: `{domain}Requests.js`
4. **Structure**:
   ```javascript
   class DomainRequests {
     static getItem(id) {}
     static createItem(data) {}
     static updateItem(id, data) {}
     static deleteItem(id) {}
   }
   ```

## Schemas (using Joi)

1. **Location**: `cypress/support/schemas/`
2. **Naming**: `{domain}-schemas.js`
3. **Structure**:
   ```javascript
   const Joi = require('joi');
   const { commonPatterns } = require('./common-schemas');

   const domainSchema = Joi.object({
     id: commonPatterns.id,
     // ... other fields
   });

   const errorSchema = Joi.object({
     status: Joi.number().required(),
     message: Joi.string().required()
   });

   module.exports = {
     domainSchema,
     errorSchema
   };
   ```

## Commands

1. **Location**: `cypress/support/commands.js`
2. **Types**:
   - Request Wrappers
   - Schema Validation
   - Common Assertions
   - Utility Functions

## Validation Standards (with Joi)

1. **Response Status and Schema**:
   ```javascript
   cy.validateResponse(response, {
     status: 200,
     schema: userSchema,
     schemaOptions: {
       abortEarly: false,
       allowUnknown: true
     }
   });
   ```

2. **Schema Organization**:
   - Use `common-schemas.js` for patterns
   - Create domain-specific schema files
   - Compose schemas using Joi methods

3. **Error Handling**:
   ```javascript
   const errorSchema = Joi.object({
     status: Joi.number().required(),
     message: Joi.string().required(),
     details: Joi.array().items(
       Joi.object({
         field: Joi.string(),
         error: Joi.string()
       })
     ).optional()
   });
   ```
