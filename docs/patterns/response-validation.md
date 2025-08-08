# Response Schema Validation Patterns

## Standard Response Validation

```javascript
// Example using our standard validation command
cy.UserRequests.getUser(1).then(response => {
  cy.validateResponse(response, {
    expectedStatus: 200,
    schemaPath: 'schemas/user-schemas',
    schemaName: 'getUserSuccess'
  });
});
```

## Request Patterns

### Using Request Classes

```javascript
// Base request class usage
cy.Requests.get('/endpoint');
cy.Requests.post('/endpoint', requestBody);
cy.Requests.put('/endpoint', requestBody);
cy.Requests.delete('/endpoint');
cy.Requests.patch('/endpoint', requestBody);

// Domain-specific request class
cy.UserRequests.getUser(userId);
cy.UserRequests.createUser(userData);
cy.UserRequests.updateUser(userId, userData);
cy.UserRequests.deleteUser(userId);
```

## Schema Validation Structure

```javascript
// Schema location: cypress/fixtures/schemas/{domain}-schemas.json
{
  "successSchema": {
    "type": "object",
    "required": ["field1", "field2"],
    "properties": {
      "field1": { "type": "string" },
      "field2": { "type": "number" }
    }
  },
  "errorSchema": {
    "type": "object",
    "required": ["status", "message"],
    "properties": {
      "status": { "type": "number" },
      "message": { "type": "string" }
    }
  }
}
```

## Common Validation Patterns

1. Success Response Validation
```javascript
cy.UserRequests.getUser(1).then(response => {
  cy.validateResponse(response, {
    expectedStatus: 200,
    schemaPath: 'schemas/user-schemas',
    schemaName: 'getUserSuccess'
  });
});
```

2. Error Response Validation
```javascript
cy.UserRequests.getUser(999).then(response => {
  cy.validateResponse(response, {
    expectedStatus: 404,
    schemaPath: 'schemas/user-schemas',
    schemaName: 'getUserError'
  });
});
```

3. Common Error Assertion
```javascript
cy.UserRequests.getUser(999).then(response => {
  cy.assertError(response, {
    status: 404,
    message: 'User not found'
  });
});
```
