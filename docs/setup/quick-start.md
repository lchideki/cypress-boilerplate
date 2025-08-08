# Quick Start Guide

## Project Setup

1. Install dependencies:
```bash
npm install
```

2. Open Cypress:
```bash
npx cypress open
```

## Project Structure

```
cypress/
├── e2e/           # Feature files and step definitions
├── support/       # Support files, custom commands
│   ├── commands.js
│   └── e2e.js
└── schemas/       # JSON schemas for validation

docs/
├── patterns/      # Common test patterns and examples
├── schemas/       # Schema documentation
└── setup/         # Setup and configuration guides
```

## Writing Tests

1. Create a `.feature` file in `cypress/e2e`
2. Create step definitions in `cypress/e2e/step_definitions`
3. Use schema validation from `cypress/support/schema-validator.js`

## Best Practices

1. Use schema validation for API responses
2. Keep schemas in separate files
3. Reuse common steps and validations
4. Use environment variables for different environments
